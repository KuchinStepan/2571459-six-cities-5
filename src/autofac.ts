import 'reflect-metadata';
import { Container } from 'inversify';
import {Application} from './application.js';
import {Logger} from './helpers/logger/logger.js';
import {ConfigProvider} from './config/config-provider.js';
import {DatabaseClient} from './core/database-client.js';
import {TYPES} from './autofac-types.js';
import {UserModel} from './core/data-models/user/user.js';
import {OfferModel} from './core/data-models/offer/offer.js';
import {UserRepository} from './core/data-models/user/UserRepository.js';
import {OfferRepository} from './core/data-models/offer/OfferRepository.js';
import {CommentRepository} from './core/data-models/comment/CommentRepository.js';
import {CommentService} from './core/services/CommentService.js';
import {UserService} from './core/services/UserService.js';
import {OfferService} from './core/services/OfferService.js';

const container = new Container();

container.bind<Application>(TYPES.Application).to(Application).inSingletonScope();
container.bind<Logger>(TYPES.Logger).to(Logger).inSingletonScope();
container.bind<ConfigProvider>(TYPES.ConfigProvider).to(ConfigProvider).inSingletonScope();
container.bind<DatabaseClient>(TYPES.DatabaseClient).to(DatabaseClient).inSingletonScope();

container.bind(TYPES.UserModel).toConstantValue(UserModel);
container.bind(TYPES.OfferModel).toConstantValue(OfferModel);

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
container.bind<OfferRepository>(TYPES.OfferRepository).to(OfferRepository).inSingletonScope();
container.bind<CommentRepository>(TYPES.CommentRepository).to(CommentRepository).inSingletonScope();

container.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
container.bind<OfferService>(TYPES.OfferService).to(OfferService).inSingletonScope();
container.bind<CommentService>(TYPES.CommentService).to(CommentService).inSingletonScope();

export { container };
