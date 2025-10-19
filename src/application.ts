import {Logger} from './helpers/logger/logger.js';

export class Application {
  constructor(private readonly logger: Logger) {}

  public async init(): Promise<void> {
    this.logger.info('Application initialized successfully!');
  }
}
