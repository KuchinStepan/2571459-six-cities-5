export interface IMiddleware {
  execute(...args: unknown[]): void;
}
