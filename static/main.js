require.config({
    baseUrl : '/static',
    paths : {
        'underscore' : 'lodash',
    },
});
define(['backbone','router'],function(Backbone,Router){
    new Router();
    Backbone.history.start();
});
