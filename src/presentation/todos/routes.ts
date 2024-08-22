import { Router } from "express";
import { TodoController } from "./controller";
import { TodoDatasourceImpl } from "../../infraestrcture/datasource/todo.datasources.impl";
import { TodoRepositoryImpl } from "../../infraestrcture/repositories/todo.repository.impl";


export class TodoRoutes {

    public static get routes(): Router {

        const router = Router();

        const datasourcePG = new TodoDatasourceImpl();
        const todoRepository = new TodoRepositoryImpl(datasourcePG)

        const todoController = new TodoController(todoRepository);

        router.get('/', todoController.getTodo);
        router.get('/:id', todoController.getTodoById);
        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodo);

        return router;
    }
}