import { RequestHandler } from 'express';


export type HTTPMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'head';

export interface RouteDefinition {
  method: HTTPMethod;
  path: string;
  handler: RequestHandler;
  middlewares?: RequestHandler[];
}
