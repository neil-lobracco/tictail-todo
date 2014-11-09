define(['handlebars','mediator'],function(Handlebars,Mediator){
    return Backbone.View.extend({
        mediator : Mediator,
        initialize : function(options){
            this.compiledTemplate = Handlebars.compile(this.template);
            this.options = options || {};
        },
        render : function(){
            this.$el.html(this.compiledTemplate(this.getContext()));
            return this;
        },
        getContext : function(){
            var context = {};
            if (this.model){
                context.model = this.model.toJSON();
            }
            if (this.collection){
                context.collection = this.collection.toJSON();
            }
            return context;
        },
    });
});
