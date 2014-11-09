define(['view','text!templates/sessions/login.html'],function(View,template){
    return View.extend({
        template : template,
        events : {
            'submit form.login' : 'login',
        },
        login : function(e){
            e.preventDefault();
            e.stopPropagation();
            var username = this.$('input[name=username]').val();
            this.model.login(username);
            this.model.once('login',function(){ window.location = '#todos'; });
        },
    });
});
