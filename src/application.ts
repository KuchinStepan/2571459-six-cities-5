import {Logger} from './helpers/logger/logger.js';
import {config} from './config/config.js';

export class Application {
  constructor(private readonly logger: Logger) {}

  public async init(): Promise<void> {
    const port = config.get('port');
    this.logger.info(`Application initialized successfully! Port: ${port}`);
  }
}
