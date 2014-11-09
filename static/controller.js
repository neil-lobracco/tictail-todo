define(['view'],function(View){
    var Controller = function(){
        this.initialize.apply(this,arguments);
    };
    Controller.prototype.protectedActions = [];
    Controller.prototype.defaultAction = 'index';
    Controller.extend = View.extend;
    return Controller;
});
