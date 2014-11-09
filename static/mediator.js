define(['underscore','backbone'],function(_,Backbone){
    var Mediator = function(){
    };
    _.extend(Mediator.prototype,Backbone.Events);
    return new Mediator();
});
