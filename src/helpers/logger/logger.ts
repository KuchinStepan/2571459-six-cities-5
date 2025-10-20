import pino from 'pino';
import {ILogger} from './ILogger.js';
import {injectable} from 'inversify';

@injectable()
export class Logger implements ILogger {
  private readonly logger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
        ignore: 'pid,hostname'
      }
    }
  });

  info(message: string, ...args: unknown[]): void {
    this.logger.info(args, message);
  }

  warn(message: string, ...args: unknown[]): void {
    this.logger.warn(args, message);
  }

  error(message: string, ...args: unknown[]): void {
    this.logger.error(args, message);
  }

  debug(message: string, ...args: unknown[]): void {
    this.logger.debug(args, message);
  }
}
