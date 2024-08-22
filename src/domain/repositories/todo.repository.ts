import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";


export abstract class TodoRepository {

    abstract create( createTodoDto: CreateTodoDto): Promise<TodoEntity>;

    //TODO pagination
    abstract getAll(): Promise<TodoEntity[]>;

    abstract getTodoById( id: number ): Promise<TodoEntity>;
    abstract updateTodo( updateTodoDto: UpdateTodoDto ): Promise<TodoEntity>;
    abstract deleteTodo( id: number ): Promise<TodoEntity>;
}