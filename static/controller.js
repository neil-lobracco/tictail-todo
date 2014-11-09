define(['view','underscore','backbone'],function(View,_,Backbone){
    var Controller = function(){
        this.initialize.apply(this,arguments);
    };
    Controller.prototype.protectedActions = [];
    Controller.prototype.defaultAction = 'index';
    Controller.prototype.mediator = View.prototype.mediator;
    _.extend(Controller.prototype,Backbone.Events);
    Controller.extend = View.extend;
    return Controller;
});
