import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import {ExistsDocumentService} from '../../../core/services/IExistsDocumentService.js';
import {IMiddleware} from '../IMiddleware.js';

export class DocumentExistsMiddleware implements IMiddleware {
  constructor(
    private readonly paramName: string,
    private readonly service: ExistsDocumentService
  ) {}

  public async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params[this.paramName];

      if (!id) {
        res.status(StatusCodes.BAD_REQUEST).json({
          error: `Parameter '${this.paramName}' is required`
        });
        return;
      }

      const exists = await this.service.exists(id);

      if (!exists) {
        res.status(StatusCodes.NOT_FOUND).json({
          error: `Entity with id=${id} not found`
        });
        return;
      }

      if (this.service.findById) {
        const entity = await this.service.findById(id);
        (req as any).entity = entity;
      }

      return next();
    } catch (err) {
      return next(err);
    }
  }
}
