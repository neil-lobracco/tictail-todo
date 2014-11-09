define(['backbone','underscore','controllers','models/session'],function(Backbone,_,Controllers,Session){
    return Backbone.Router.extend({
        initialize : function(){
            this.session = new Session();
        },
        defaultController : 'todos',
        currentView : undefined,
        routes : {
           '' : handleAction,
           ':controller' : handleAction,
           ':controller/:action' : handleAction,
           ':controller/:action/:id' : handleAction,
        },
        handleAction : function(controller,action,id){
            var controller = Controllers[controller || this.defaultController];
            action = action || controller.getDefaultAction();
            if (_.contains(controller.protectedActions) && session.loginRequired()){
                controller = Controllers['sessions'];
                action = 'new';
            }
            var view = controller[action]({
                id : id,
                session : session,
            );
            if (view){
                if (this.currentView){
                    this.currentView.remove();
                    delete this.currentView;
                }
                this.currentView = view;
                this.currentView.setElement('body').render();
            }
        },
    });
});
