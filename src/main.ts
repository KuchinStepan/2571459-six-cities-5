import {Application, TYPES} from './application.js';
import {container} from './autofac.js';

const app = container.get<Application>(TYPES.Application);
await app.init();

