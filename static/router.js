define(['backbone','underscore','controllers','models/session'],function(Backbone,_,Controllers,Session){
    return Backbone.Router.extend({
        initialize : function(){
            this.sessionController = Controllers['sessions'];
        },
        defaultController : 'todos',
        currentView : undefined,
        routes : {
           '' : 'handleAction',
           ':controller' : 'handleAction',
           ':controller/:action' : 'handleAction',
           ':controller/:action/:id' : 'handleAction',
        },
        handleAction : function(controller,action,id){
            var controller = Controllers[controller || this.defaultController] || Controllers[this.defaultController];
            action = action || controller.defaultAction;
            if (_.contains(controller.protectedActions,action) && this.sessionController.loginRequired()){
                window.location = '#sessions/login';
                return;
            }
            var view = controller[action]({
                id : id,
                session : this.sessionController,
            });
            if (view){
                if (this.currentView){
                    this.currentView.remove();
                    delete this.currentView;
                }
                this.currentView = view;
                $('.main-content').append(this.currentView.render().$el)
            }
        },
    });
});
