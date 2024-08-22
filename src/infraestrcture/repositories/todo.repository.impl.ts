import { CreateTodoDto, TodoDatasources, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";



export class TodoRepositoryImpl implements TodoRepository {

    constructor(
        private readonly datasource: TodoDatasources,
    ){}


    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.create( createTodoDto );
    }

    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll();
    }

    getTodoById(id: number): Promise<TodoEntity> {
        return this.datasource.getTodoById( id );
    }

    updateTodo(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.datasource.updateTodo( updateTodoDto );
    }
    
    deleteTodo(id: number): Promise<TodoEntity> {
        return this.datasource.deleteTodo( id );
    }

}