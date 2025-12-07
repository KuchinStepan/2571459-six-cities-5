import { Router, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import {IController} from './IController.js';
import {RouteDefinition} from './route-definition.js';

export abstract class Controller implements IController {
  public readonly router: Router;
  constructor(public readonly path: string) {
    this.router = Router();
  }

  abstract registerRoutes(): void;

  public addRoute(route: RouteDefinition): void {
    const middlewares = route.middlewares?.map((mw) => mw.execute.bind(mw)) ?? [];

    this.router[route.method](
      route.path,
      ...middlewares,
      route.handler.bind(this)
    );
  }

  protected ok<T>(res: Response, dto?: T) {
    if (dto !== undefined) {
      return res.status(StatusCodes.OK).json(dto);
    }
    return res.sendStatus(StatusCodes.OK);
  }

  protected created<T>(res: Response, dto?: T) {
    if (dto !== undefined) {
      return res.status(StatusCodes.CREATED).json(dto);
    }
    return res.sendStatus(StatusCodes.CREATED);
  }

  protected noContent(res: Response) {
    return res.sendStatus(StatusCodes.NO_CONTENT);
  }

  protected badRequest(res: Response, message?: string) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      error: message ?? getReasonPhrase(StatusCodes.BAD_REQUEST),
    });
  }

  protected unauthorized(res: Response, message?: string) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: StatusCodes.UNAUTHORIZED,
      error: message ?? getReasonPhrase(StatusCodes.UNAUTHORIZED),
    });
  }

  protected forbidden(res: Response, message?: string) {
    return res.status(StatusCodes.FORBIDDEN).json({
      status: StatusCodes.FORBIDDEN,
      error: message ?? getReasonPhrase(StatusCodes.FORBIDDEN),
    });
  }

  protected notFound(res: Response, message?: string) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: StatusCodes.NOT_FOUND,
      error: message ?? getReasonPhrase(StatusCodes.NOT_FOUND),
    });
  }

  protected fail(res: Response, error?: Error | string) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: typeof error === 'string' ? error : (error?.message ?? getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)),
    });
  }
}
