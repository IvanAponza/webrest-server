import { AppRoutes } from './../src/presentation/routes';
import {Server} from '../src/presentation/server';
import { envs } from './../src/config/adapter/envs';

export const testServer = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
})