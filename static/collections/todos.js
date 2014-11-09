define(['backbone'],function(Backbone){
    return Backbone.Collection.extend({
        model : Backbone.Model.extend({ idAttribute : '_id' }),
        url : '/todos',
    });
});
