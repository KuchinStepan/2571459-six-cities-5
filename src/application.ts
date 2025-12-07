import { Logger } from './helpers/logger/logger.js';
import { inject, injectable } from 'inversify';
import { ConfigProvider } from './config/config-provider.js';
import { DatabaseClient } from './core/database-client.js';
import { TYPES } from './autofac-types.js';

import express, { Application as ExpressApp, Request, Response, NextFunction } from 'express';
import { Server } from 'node:http';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import expressAsyncHandler from 'express-async-handler';
import {OfferController} from './controller/implementation/OfferController.js';
import {UserController} from './controller/implementation/UserController.js';
import {CommentsController} from './controller/implementation/CommentsController.js';
import {OfferService} from './core/services/OfferService.js';

@injectable()
export class Application {
  private expressApp!: ExpressApp;
  private server?: Server;

  constructor(
    @inject(TYPES.DatabaseClient) private readonly dbClient: DatabaseClient,
    @inject(TYPES.Logger) private readonly logger: Logger,
    @inject(TYPES.ConfigProvider) private readonly config: ConfigProvider,
    @inject(TYPES.OfferService) private readonly offerService: OfferService,
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

    const userController = new UserController();
    const offerController = new OfferController(this.offerService);
    const commentsController = new CommentsController();

    this.expressApp.use(`/api${ userController.path}`, userController.router);
    this.expressApp.use(`/api${ offerController.path}`, offerController.router);
    this.expressApp.use(`/api${ commentsController.path}`, commentsController.router);

    this.expressApp.get(
      '/api/premium/:city',
      expressAsyncHandler(offerController.getPremiumByCity.bind(offerController))
    );

    this.expressApp.use((_req: Request, res: Response) => {
      res.status(StatusCodes.NOT_FOUND).json({
        error: getReasonPhrase(StatusCodes.NOT_FOUND)
      });
    });

    this.expressApp.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
      try {
        if (err instanceof Error) {
          this.logger.error('Unhandled error', err);
        } else {
          this.logger.error('Unhandled error (non-error throwable)', new Error(String(err)));
        }
      } catch {
        console.error('Failed to log error', err);
      }

      const defaultStatus = StatusCodes.INTERNAL_SERVER_ERROR;

      let status = defaultStatus;
      let message = getReasonPhrase(defaultStatus);

      if (typeof err === 'object' && err !== null) {
        const maybeErr = err as { status?: unknown; message?: unknown };
        if (typeof maybeErr.status === 'number') {
          status = maybeErr.status;
        }
        if (typeof maybeErr.message === 'string') {
          message = maybeErr.message;
        }
      } else if (typeof err === 'string') {
        message = err;
      }

      if (!Number.isInteger(status) || status < 100 || status > 599) {
        status = defaultStatus;
      }

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
      if (err instanceof Error) {
        this.logger.error('Application: failed to connect to database', err);
      } else {
        this.logger.error('Application: failed to connect to database', new Error(String(err)));
      }
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
        if (err instanceof Error) {
          this.logger.error('Error while closing HTTP server', err);
        } else {
          this.logger.error('Error while closing HTTP server', new Error(String(err)));
        }
      }

      try {
        await this.dbClient.disconnect();
        this.logger.info('Database disconnected');
      } catch (err) {
        if (err instanceof Error) {
          this.logger.error('Error while disconnecting database', err);
        } else {
          this.logger.error('Error while disconnecting database', new Error(String(err)));
        }
      } finally {
        // process.exit(0);
      }
    };

    process.on('SIGINT', () => void shutdown('SIGINT'));
    process.on('SIGTERM', () => void shutdown('SIGTERM'));
    process.on('uncaughtException', async (err) => {
      if (err instanceof Error) {
        this.logger.error('Uncaught exception, shutting down', err);
      } else {
        this.logger.error('Uncaught exception (non-error), shutting down', new Error(String(err)));
      }
      await shutdown('uncaughtException');
    });
    process.on('unhandledRejection', async (reason) => {
      if (reason instanceof Error) {
        this.logger.error('Unhandled rejection, shutting down', reason);
      } else {
        this.logger.error('Unhandled rejection (non-error), shutting down', new Error(String(reason)));
      }
      await shutdown('unhandledRejection');
    });
  }

  public getExpressApp(): ExpressApp {
    return this.expressApp;
  }
}
