define(i['view',function(View){
    var Controller = function(){
        this.initialize.apply(this,arguments);
    };
    Controller.prototype.protectedActions = [];
    Controller.prototype.defaultAction = 'index';
    Controller.prototype.extend = View.extend;
    return Controller;
});
