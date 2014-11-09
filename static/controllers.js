define(['controllers/todos_controller'],function(TodosController){
    return {
        todos : new TodosController(),
        sessions : null,
    };
});
