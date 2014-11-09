define(['controller','views/todo/index','collections/todos'],function(Controller,TodosView,Todos){
    return Controller.extend({
        initialize : function(){
            this.todos = new Todos(window.todos || []);
            delete window.todos;
            this.listenTo(this.mediator,'login',this.refetch);
         },
        refetch : function(){
            this.todos.reset();
            this.todos.fetch();
        },
        protectedActions : ['index'],
        index : function(params){
            var username = params.session.getUsername();
            return new TodosView({ collection : this.todos, username : username });
        },
    });
});
