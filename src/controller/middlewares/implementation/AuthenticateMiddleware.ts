import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { jwtVerify } from 'jose';
import {ConfigProvider} from '../../../config/config-provider.js';
import {UserService} from '../../../core/services/UserService.js';

export class AuthenticateMiddleware {
  constructor(
    private readonly config: ConfigProvider,
    private readonly userService: UserService,
  ) {}

  public execute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const auth = req.headers.authorization;

      if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
      }

      const token = auth.split(' ')[1];

      const secret = new TextEncoder().encode(this.config.jwtSecret);

      const { payload } = await jwtVerify(token, secret);

      // payload = { id, email, type }
      const user = await this.userService.findById(String(payload.id));

      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'User not found' });
      }

      req.user = {
        id: user.id,
        email: user.email,
        type: user.type,
      };

      return next();
    } catch (err) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
    }
  };
}
