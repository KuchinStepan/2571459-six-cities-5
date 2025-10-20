import 'reflect-metadata';
import { Container } from 'inversify';
import {Application} from './application.js';
import {Logger} from './helpers/logger/logger.js';
import {ConfigProvider} from './config/config-provider.js';
import {DatabaseClient} from './core/database-client.js';
import {TYPES} from './autofac-types.js';

const container = new Container();

container.bind<Application>(TYPES.Application).to(Application).inSingletonScope();
container.bind<Logger>(TYPES.Logger).to(Logger).inSingletonScope();
container.bind<ConfigProvider>(TYPES.ConfigProvider).to(ConfigProvider).inSingletonScope();
container.bind<DatabaseClient>(TYPES.DatabaseClient).to(DatabaseClient).inSingletonScope();

export { container };
