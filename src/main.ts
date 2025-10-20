import {Application} from './application.js';
import {container} from './autofac.js';
import {TYPES} from './autofac-types.js';

const app = container.get<Application>(TYPES.Application);
await app.init();

