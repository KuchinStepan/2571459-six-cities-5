import mongoose from 'mongoose';
import { injectable, inject } from 'inversify';
import {Logger} from '../helpers/logger/logger.js';
import {ConfigProvider} from '../config/config-provider.js';
import {TYPES} from '../autofac-types.js';

@injectable()
export class DatabaseClient {
  constructor(
    @inject(TYPES.Logger) private readonly logger: Logger,
    @inject(TYPES.ConfigProvider) private readonly config: ConfigProvider
  ) {}

  public async connect(): Promise<void> {
    const uri = this.config.mongoUri;

    this.logger.info(`Attempting to connect to the database: ${uri}`);

    try {
      await mongoose.connect(uri);
      this.logger.info('Connection to MongoDB has been successfully established');
    } catch (error) {
      this.logger.error(`Error connecting to MongoDB: ${(error as Error).message}`);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    this.logger.info('Connection to MongoDB is closed');
  }
}
