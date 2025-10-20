import {Logger} from './helpers/logger/logger.js';
import {inject, injectable} from 'inversify';
import {ConfigProvider} from './config/config-provider.js';

export const TYPES = {
  Application: Symbol.for('Application'),
  Logger: Symbol.for('Logger'),
  ConfigProvider: Symbol.for('ConfigProvider'),
} as const;

@injectable()
export class Application {
  constructor(
    @inject(TYPES.Logger) private readonly logger: Logger,
    @inject(TYPES.ConfigProvider) private readonly config: ConfigProvider
  ) {}

  public async init(): Promise<void> {
    const port = this.config.port;
    this.logger.info(`Application initialized successfully! Port: ${port}`);
  }
}

