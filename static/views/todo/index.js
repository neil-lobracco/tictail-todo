define(['view','text!templates/todos/index.html','underscore'],function(View,template,_){
    return View.extend({
        template : template,
        events : {
            'submit form' : 'createTodo',
            'change .todo input[type=checkbox]' : 'checkChange',
            'click .mark-all-complete' : 'markAllComplete',
            'click .remove' : 'removeTodo',
        },
        initialize : function(){
            View.prototype.initialize.apply(this,arguments);
            this.listenTo(this.collection,'add remove reset sync',this.render);
        },
        getContext : function(){
            return _.extend(View.prototype.getContext.apply(this,arguments),{
                numLeft : this.collection.where({complete : false }).length,
                username : this.options.username,
            });
        },
        createTodo : function(e){
            e.preventDefault();
            e.stopPropagation();
            this.collection.create({
                text : this.$('form.create-todo input[name=text]').val(),
                complete : false,
            });
            this.render();
        },
        removeTodo : function(e){
            var $input = this.$(e.currentTarget);
            var model = this.collection.get($input.parent().parent().attr('data-todo-id'));
            model.destroy();
        },
        checkChange : function(e){
            var $input = this.$(e.currentTarget);
            var model = this.collection.get($input.parent().parent().attr('data-todo-id'));
            model.set('complete',!!$input.prop('checked'));
            model.save();
            this.render();
        },
        markAllComplete : function(e){
            this.collection.each(function(model){
                model.set('complete',true);
                model.save();
            });
            this.render();
        },
    });
});
