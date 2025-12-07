import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import {IMiddleware} from '../IMiddleware.js';

export class ValidateDtoMiddleware<T extends object> implements IMiddleware {
  constructor(private dtoClass: new () => T) {}

  public async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const dto = plainToInstance(this.dtoClass, req.body, {
      excludeExtraneousValues: true
    });

    const errors = await validate(dto, { whitelist: true });

    if (errors.length > 0) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Validation failed',
        details: errors.map((e) => ({
          property: e.property,
          constraints: e.constraints
        }))
      });
      return;
    }

    req.body = dto;
    next();
  }
}
