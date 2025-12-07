import { RequestHandler } from 'express';
import {IMiddleware} from './middlewares/IMiddleware.js';


export type HTTPMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'head';

export interface RouteDefinition {
  method: HTTPMethod;
  path: string;
  handler: RequestHandler;
  middlewares?: IMiddleware[];
}
