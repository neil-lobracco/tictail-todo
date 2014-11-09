define(['controller','views/todo/index','collections/todos'],function(Controller,TodosView,Todos){
    return Controller.extend({
        initialize : function(){
            this.todos = new Todos(window.todos || []);
            delete window.todos;
         },
        protectedActions : ['index'],
        index : function(params){
            return new TodosView({ collection : this.todos });
        },
    });
});
