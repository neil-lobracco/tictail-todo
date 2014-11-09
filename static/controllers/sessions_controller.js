define(['controller','models/session','views/session/login_view'],function(Controller,Session,LoginView){
    return Controller.extend({
        initialize : function(){
            this.session = new Session({ userId : window.userId, username : window.username });
            delete window.userId;
            delete window.username;
        },
        loginRequired : function(){
            return this.session.loginRequired();
        },
        logout : function(params){
            var done = function(){window.location = '/';};
            if (!this.loginRequired()){
                this.session.destroy().complete(done);
            } else { done(); }
        },
        login : function(params){
            return new LoginView({ model : this.session });
        },
        getUsername : function(){
            return this.session.get('username');
        },
    });
});
