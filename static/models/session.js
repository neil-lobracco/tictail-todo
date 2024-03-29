define(['backbone'],function(Backbone){
    return Backbone.Model.extend({
        urlRoot : '/sessions',
        idAttribute : 'userId',
        initialize : function(){
            this.set('userId',window.userId);
        },
        loginRequired : function(){
            return this.isNew();
        },
        login : function(username){
            this.save('username',username,{ success : _.bind(this.trigger,this,'login') });
        },
    });
});

