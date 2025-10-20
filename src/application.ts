import {Logger} from './helpers/logger/logger.js';
import {inject, injectable} from 'inversify';
import {ConfigProvider} from './config/config-provider.js';
import {DatabaseClient} from './core/database-client.js';
import {TYPES} from './autofac-types.js';


@injectable()
export class Application {
  constructor(
    @inject(TYPES.DatabaseClient) private readonly dbClient: DatabaseClient,
    @inject(TYPES.Logger) private readonly logger: Logger,
    @inject(TYPES.ConfigProvider) private readonly config: ConfigProvider,
  ) {}

  public async init(): Promise<void> {
    const port = this.config.port;
    await this.dbClient.connect();
    this.logger.info(`Application initialized successfully! Port: ${port}`);
    await this.dbClient.disconnect();
  }
}

