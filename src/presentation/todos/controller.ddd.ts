import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodoController {

    constructor(
        private readonly todoRepository: TodoRepository,
    ) { }

    public getTodo = async (req: Request, res: Response) => {

        // const todos = await prisma.todo.findMany();
        // res.json(todos);

        //Usando el repository para obtener todos
        const todos = await this.todoRepository.getAll();
        return res.json(todos);
    };

    public getTodoById = async (req: Request, res: Response) => {

        // const id = +req.params.id;
        // if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not number' });
        // const todo = await prisma.todo.findFirst({ where: { id } });
        // (todo) ? res.json(todo) : res.status(404).json({ error: `Todo with id ${id} not found` })
        
        //Usando el repository para obtener un todo
        const id = +req.params.id;
        try {
            const todo = await this.todoRepository.getTodoById(id);
            return res.json(todo);
        } catch (error) {
            res.status(400).json({ error });
        }

    };

    public createTodo = async (req: Request, res: Response) => {

        //Uso DB PG - Prisma
        // const { text } = req.body;
        // if (!text) return res.status(400).json({ error: 'Text property is required' });
        // const todo = await prisma.todo.create({ data: { text } })

        //Uso DTOS
        // const [error, createTodoDto] = CreateTodoDto.create(req.body)
        // if(error) return res.status(400).json({ error })
        // const todo = await prisma.todo.create({ data: createTodoDto! })
        // res.json(todo)
        
        //Usando el repository para crear un todo
        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        if(error) return res.status(400).json({ error })
        try {
            const todo = await this.todoRepository.create( createTodoDto! )
            res.status(201).json(todo);
        } catch (error) {
           res.status(400).json({ error }) 
        }
        
    }

    public updateTodo = async (req: Request, res: Response) => {

        //Usando DB Postgres - Prisma
        // const id = +req.params.id
        // if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not number' });
        // const todo = await prisma.todo.findFirst({ where: { id } });
        // if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })
        // const { text, createAt } = req.body;
        // const updateTodo = await prisma.todo.update({
        //     where: { id },
        //     data: { 
        //         text, 
        //         createAt: (createAt) ? new Date(createAt) : null 
        //     }
        // });
        // res.json(updateTodo);

        //Usando DTOS
        // const id = +req.params.id;
        // const [ error, updateTodoDto ] = UpdateTodoDto.create({ ...req.body, id });
        // if( error ) return res.status( 400 ).json({ error });

        // const todo = await prisma.todo.findFirst({ where: { id } });

        // if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })
        // const updatedTodo = await prisma.todo.update({
        //     where: { id },
        //     data: updateTodoDto!.values
        // });
        // res.json(updatedTodo);
        
        //usando Repository para apdate un todo
        const id = +req.params.id;
        const [ error, updateTodoDto ] = UpdateTodoDto.create({ ...req.body, id });
        if( error ) return res.status( 400 ).json({ error });
        try {
            const updatedTodo = await this.todoRepository.updateTodo( updateTodoDto! );
            return res.status(200).json(updatedTodo);            
        } catch (error) {
            res.status(400).json({ error})
        }


    }

    public deleteTodo = async (req: Request, res: Response) => {

        // const id = +req.params.id;
        
        // const todo = await prisma.todo.findFirst({ where: { id } });
        // if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })
        
        // const deleted = await prisma.todo.delete({ where: { id } });
        // ( deleted ) ? res.json(deleted) : res.status(400).json({error: `Todo with id ${id} not found` });
        
        //Usando el repository para eliminar un todo
        const id = +req.params.id;
        try {
            const deletedTodo = await this.todoRepository.deleteTodo( id );
            res.status(200).json(deletedTodo);
        } catch (error) {
            res.status(400).json({ error: `Todo with id ${id} not found` });
        }

    }

}