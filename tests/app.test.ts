import { envs } from '../src/config/adapter/envs';
import { Server } from '../src/presentation/server';

//mock de todo el server
jest.mock('../src/presentation/server');

//Evaluamos q metodo main haya sido llamado con los metodos q estamos esperando
describe('should call server with arguments and start', () => {
    
    test('should work', async() => {

        await import('../src/app');

        expect(Server).toHaveBeenCalledTimes(1); //llamado 1 vez
        expect( Server ).toHaveBeenCalledWith({
            port: envs.PORT,
            public_path: envs.PUBLIC_PATH,
            routes: expect.any(Function), //Q haya sido llamas con cualq function
        });
        expect( Server.prototype.start ).toHaveBeenCalledWith()
    });
});