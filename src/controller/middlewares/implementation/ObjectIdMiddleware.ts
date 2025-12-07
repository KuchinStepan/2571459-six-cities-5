
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import {IMiddleware} from '../IMiddleware.js';

export class ValidateObjectIdMiddleware implements IMiddleware {
  constructor(private readonly paramName: string) {}

  execute(req: Request, res: Response, next: NextFunction): void {
    const id = req.params[this.paramName];

    if (!mongoose.isValidObjectId(id)) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: `Invalid ObjectId: parameter ${this.paramName} = "${id}"`
      });
    }

    next();
  }
}
