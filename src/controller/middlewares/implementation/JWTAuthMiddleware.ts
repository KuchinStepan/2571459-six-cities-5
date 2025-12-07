import { jwtVerify } from 'jose';
import { Request, Response, NextFunction } from 'express';

export class JWTAuthMiddleware {
  constructor(private secret: string) {}

  async execute(req: Request, _: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      req.user = null;
      return next();
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const secretKey = new TextEncoder().encode(this.secret);
      const { payload } = await jwtVerify(token, secretKey);

      req.user = {
        id: payload.id as string,
        email: payload.email as string,
      };

    } catch {
      req.user = null;
    }

    next();
  }
}
