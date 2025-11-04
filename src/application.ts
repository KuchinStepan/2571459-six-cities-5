import { Logger } from './helpers/logger/logger.js';
import { inject, injectable } from 'inversify';
import { ConfigProvider } from './config/config-provider.js';
import { DatabaseClient } from './core/database-client.js';
import { TYPES } from './autofac-types.js';

import express, { Application as ExpressApp, Request, Response, NextFunction } from 'express';
import { Server } from 'http';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import expressAsyncHandler from 'express-async-handler';

@injectable()
export class Application {
  private expressApp!: ExpressApp;
  private server?: Server;

  constructor(
    @inject(TYPES.DatabaseClient) private readonly dbClient: DatabaseClient,
    @inject(TYPES.Logger) private readonly logger: Logger,
    @inject(TYPES.ConfigProvider) private readonly config: ConfigProvider,
  ) {}

  public async init(): Promise<void> {
    this.expressApp = express();

    this.expressApp.use(express.json({ limit: '1mb' }));
    this.expressApp.use(express.urlencoded({ extended: true }));

    this.expressApp.get(
      '/',
      expressAsyncHandler(async (_req: Request, res: Response) => {
        res.status(StatusCodes.OK).json({
          status: 'ok',
          port: this.config.port,
          pid: process.pid
        });
      })
    );

    this.expressApp.use((_req: Request, res: Response) => {
      res.status(StatusCodes.NOT_FOUND).json({
        error: getReasonPhrase(StatusCodes.NOT_FOUND)
      });
    });

    this.expressApp.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
      this.logger.error('Unhandled error', err as Error);
      const status = (err && typeof (err as any).status === 'number') ? (err as any).status : StatusCodes.INTERNAL_SERVER_ERROR;
      const message = (err && (err as any).message) ? (err as any).message : getReasonPhrase(status);
      res.status(status).json({ error: message });
    });

    await this.start();
  }

  private async start(): Promise<void> {
    const port = Number(this.config.port) || 3000;

    this.logger.info(`Application: starting on port ${port}`);
    try {
      this.logger.info('Application: connecting to database...');
      await this.dbClient.connect();
      this.logger.info('Application: database connected');
    } catch (err) {
      this.logger.error('Application: failed to connect to database', err as Error);
      throw err;
    }

    await new Promise<void>((resolve, reject) => {
      try {
        this.server = this.expressApp.listen(port, () => {
          this.logger.info(`HTTP server listening on port ${port}`);
          resolve();
        });
      } catch (err) {
        reject(err);
      }
    });

    const shutdown = async (signal?: string) => {
      this.logger.info(`Shutdown initiated${signal ? ` by ${signal}` : ''}`);
      try {
        if (this.server) {
          await new Promise<void>((resolve, reject) => {
            this.server!.close((err) => (err ? reject(err) : resolve()));
          });
          this.logger.info('HTTP server closed');
        }
      } catch (err) {
        this.logger.error('Error while closing HTTP server', err as Error);
      }

      try {
        await this.dbClient.disconnect();
        this.logger.info('Database disconnected');
      } catch (err) {
        this.logger.error('Error while disconnecting database', err as Error);
      } finally {
        process.exit(0);
      }
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('uncaughtException', async (err) => {
      this.logger.error('Uncaught exception, shutting down', err as Error);
      await shutdown('uncaughtException');
    });
    process.on('unhandledRejection', async (reason) => {
      this.logger.error('Unhandled rejection, shutting down', reason as Error);
      await shutdown('unhandledRejection');
    });
  }

  public getExpressApp(): ExpressApp {
    return this.expressApp;
  }
}
