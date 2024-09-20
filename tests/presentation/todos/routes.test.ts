import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';


describe('Todo route testing', () => {

    //Levantamos server antes de todos los test
    beforeAll(async() => {
        await testServer.start();
    })

    //Cierra los puertos despues de todos los test
    afterAll(() => {
        testServer.close()
    })

    //Eliminamos los todos antes de todas los test
    beforeAll(async() => {
        await prisma.todo.deleteMany()
    })

    const todo1 = { text: 'Hola mundo 1'};
    const todo2 = { text: 'Hola mundo 2'};

    //Prueba obtener todos los todos
    test('should return TODOs api/todos', async() => {

        //Insertamos todos 
        await prisma.todo.createMany({
            data: [todo1, todo2]
        });

        const { body } = await request( testServer.app )
            .get('/api/todos')
            .expect(200);

        expect( body ).toBeInstanceOf( Array );
        expect( body.length ).toBe(2);
        expect( body[0].text ).toBe( todo1.text);
        expect( body[1].text ).toBe( todo2.text);
        expect( body[0].createAt ).toBeNull();
    });

    //Prueba obtener un todo
    test('should return a TODO api/todos/:id', async() => {

        const todo = await prisma.todo.create({ data: todo1 });

        const { body } = await request( testServer.app )
            .get(`/api/todos/${ todo.id}`)
            .expect(200);

        expect( body ).toEqual({
            id: todo.id,
            text: todo.text,
            createAt: todo.createAt
        });
        
    });

    //Prueba si no existe el todo
    test('should return 404 NotFound api/todos/:id', async() => {

        const todoId = 999;
        const { body } = await request( testServer.app )
            .get(`/api/todos/${todoId}`)
            .expect(404);

        // console.log(body);
        expect( body ).toEqual({ error: `Todo with id ${todoId} not found` })
        
    });

    //Pruea en Create todo
    test('should return a new TODO api/todos/', async() => {

        const { body } = await request( testServer.app )
            .post(`/api/todos`)
            .send( todo1 )
            .expect(201);

        // console.log(body)
        expect( body ).toEqual({
            id: expect.any(Number),
            text: todo1.text,
            createAt: null,
        })
    });

    //Prueba que text exista
    test('should return an error if text is not present api/todos/', async() => {

        const { body } = await request( testServer.app )
            .post(`/api/todos`)
            .send({ })
            .expect(400);

        // console.log(body)
        expect( body ).toEqual({ error: 'Text property is required' })
    });

    //Prueba q text no vaya vacio
    test('should return an error if text is empty api/todos/', async() => {

        const { body } = await request( testServer.app )
            .post(`/api/todos`)
            .send({ text: '' })
            .expect(400);

        // console.log(body)
        expect( body ).toEqual({ error: 'Text property is required' })
    });

    //Actualiza todo
    test('should return an update TODO api/todos/:id', async() => {

        const todo = await prisma.todo.create({ data: todo1 });

        const { body } = await request( testServer.app )
            .put(`/api/todos/${todo.id}`)
            .send({ text: 'Hola mundo Update', createAt: '2024-9-18' })
            .expect(200);

        // console.log(body)
        expect( body ).toEqual({
            id: expect.any(Number),
            text: 'Hola mundo Update',
            createAt: '2024-09-18T05:00:00.000Z'
          })
    });

    //Pruea Error 400
    test('should return 404 if TODO notfound api/todos/:id', async() => {

        const todoId = 1000;
        const { body } = await request( testServer.app )
            .get(`/api/todos/${todoId}`)
            .expect(404);

        // console.log(body);
        expect( body ).toEqual({ error: `Todo with id ${todoId} not found` })
        
    });
    
    // Actualiza solo la fecha
    test('should return an update TODO only the date', async() => {

        const todo = await prisma.todo.create({ data: todo1 });

        const { body } = await request( testServer.app )
            .put(`/api/todos/${todo.id}`)
            .send({ createAt: '2024-9-18' })
            .expect(200);

        // console.log(body)
        expect( body ).toEqual({
            id: expect.any(Number),
            text: todo.text,
            createAt: '2024-09-18T05:00:00.000Z'
          })
    });

    //Actualiza solo el text
    test('should return an update TODO only the text', async() => {

        const todo = await prisma.todo.create({ data: todo1 });

        const { body } = await request( testServer.app )
            .put(`/api/todos/${todo.id}`)
            .send({ text: 'Hola mundo Update' })
            .expect(200);

        // console.log(body)
        expect( body ).toEqual({
            id: expect.any(Number),
            text: 'Hola mundo Update',
            createAt: todo.createAt,
          })
    });

    test('should delete TODO api/todos/:id', async() => {

        const todo = await prisma.todo.create({ data: todo1 });
        const { body } = await request(testServer.app)
            .delete(`/api/todos/${todo.id}`)
            .expect(200);
        
        // console.log(body)
        expect( body ).toEqual({
            id: expect.any(Number),
            text: todo.text,
            createAt: null,
        })
    });
    test('should return 404 if todo do not exist api/todos/:id', async() => {

        const todoId = 999
        const { body } = await request(testServer.app)
            .delete(`/api/todos/${todoId}`)
            .expect(404);
        
        // console.log(body)
        expect( body ).toEqual({ error: `Todo with id ${todoId} not found` });
    });
})