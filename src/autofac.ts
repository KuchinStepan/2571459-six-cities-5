import 'reflect-metadata';
import { Container } from 'inversify';
import {Application, TYPES} from './application.js';
import {Logger} from './helpers/logger/logger.js';
import {ConfigProvider} from './config/config-provider.js';

const container = new Container();

container.bind<Application>(TYPES.Application).to(Application).inSingletonScope();
container.bind<Logger>(TYPES.Logger).to(Logger).inSingletonScope();
container.bind<ConfigProvider>(TYPES.ConfigProvider).to(ConfigProvider).inSingletonScope();

export { container };
