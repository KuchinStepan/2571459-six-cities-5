import {Application} from './application.js';
import {Logger} from './helpers/logger/logger.js';

const logger = new Logger();
const app = new Application(logger);
await app.init();

