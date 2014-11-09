define(['handlebars'],function(Handlebars){
    return Backbone.View.extend({
        initialize : function(){
            this.compiledTemplate = Handlebars.compile(this.template);
        },
        render : function(){
            this.$el.html(this.compiledTemplate(this.getContext()));
            return this;
        },
        getContext : function(){
            var obj = this.model || this.collection;
            return obj ? obj.toJSON() : {};
        },
    });
});
