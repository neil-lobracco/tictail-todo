define(['controllers/todos_controller','controllers/sessions_controller'],function(TodosController,SessionsController){
    return {
        todos : new TodosController(),
        sessions : new SessionsController(),
    };
});
