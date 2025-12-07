import { Router } from 'express';
import {RouteDefinition} from './route-definition.js';

export interface IController {
  path: string;
  router: Router;
  registerRoutes(): void;
  addRoute(route: RouteDefinition): void;
}
