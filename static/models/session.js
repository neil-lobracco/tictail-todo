define(['backbone','config'],function(Backbone){
    return Backbone.Model.extend({
        urlRoot : '/sessions',
        idAttribute : 'userId',
        initialize : function(){
            this.set('userId',window.userId);
        },
        loginRequired : function(){
            return this.isNew();
        },
    });
});

