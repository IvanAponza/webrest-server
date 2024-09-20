import { prisma } from "../../data/postgres";
import { CreateTodoDto, CustomError, TodoDatasources, TodoEntity, UpdateTodoDto } from "../../domain";


export class TodoDatasourceImpl implements TodoDatasources {

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {

        const todo = await prisma.todo.create({ data: createTodoDto! })
        return TodoEntity.fromObject(todo);
    }

    async getAll(): Promise<TodoEntity[]> {

        const todos = await prisma.todo.findMany();
        return todos.map( todo => TodoEntity.fromObject(todo));
    }

    async getTodoById(id: number): Promise<TodoEntity> {
        
        const todo = await prisma.todo.findFirst({ where: { id } });

        if( !todo ) throw new CustomError(`Todo with id ${ id } not found`, 404);
        return TodoEntity.fromObject( todo )
    }

    async updateTodo(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        
        await this.getTodoById( updateTodoDto.id );
        const updatedTodo = await prisma.todo.update({
            where: { id: updateTodoDto.id },
            data: updateTodoDto!.values
        });

        return TodoEntity.fromObject( updatedTodo );
    }
    
    async deleteTodo(id: number): Promise<TodoEntity> {
        
        await this.getTodoById( id );
        const deleted = await prisma.todo.delete({ where: { id } });
        return TodoEntity.fromObject( deleted )
    }

}