import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { Controller } from '../controller.js';
import {UserDTO, UserLoginDTO, UserRegisterDTO} from '../types/user-dto.js';
import {ValidateDtoMiddleware} from '../middlewares/implementation/ValidateDtoMiddleware.js';
import {CreateUserDTO} from '../../core/data-models/user/dto/CreateUserDto.js';

const users: Array<any> = [];

export class UserController extends Controller {
  constructor() {
    super('/users');
    this.registerRoutes();
  }

  public registerRoutes(): void {
    this.addRoute({
      method: 'post',
      path: '/register',
      handler: this.register,
      middlewares: [
        new ValidateDtoMiddleware(CreateUserDTO)
      ]
    });

    this.addRoute({
      method: 'post',
      path: '/login',
      handler: this.login,
      middlewares: [
        new ValidateDtoMiddleware(UserRegisterDTO)
      ]
    });

    this.router.get('/status', asyncHandler(this.status.bind(this)));
  }

  private async register(req: Request, res: Response): Promise<void> {
    const dto = plainToInstance(UserRegisterDTO, req.body, { excludeExtraneousValues: true });

    const exists = users.find((u) => u.email === dto.email);
    if (exists) {
      this.badRequest(res, 'User with this email already exists'); // можно заменить на 409 при желании
      return;
    }

    const created = {
      id: (Math.random() * 1e18).toString(36),
      name: dto.name,
      email: dto.email,
      avatar: dto.avatar ?? null,
      type: dto.type,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push({ ...created, password: dto.password });

    const response = plainToInstance(UserDTO, created, { excludeExtraneousValues: true });
    this.created(res, response);
  }

  private async login(req: Request, res: Response): Promise<void> {
    const dto = plainToInstance(UserLoginDTO, req.body, { excludeExtraneousValues: true });

    const user = users.find((u) => u.email === dto.email && u.password === dto.password);
    if (!user) {
      this.unauthorized(res, 'Invalid email or password');
      return;
    }

    this.ok(res, { token: 'jwt-token' });
  }

  private async status(_: Request, res: Response): Promise<void> {
    const user = users[0];
    if (!user) {
      this.unauthorized(res, 'Not authenticated');
      return;
    }

    const response = plainToInstance(UserDTO, user, { excludeExtraneousValues: true });
    this.ok(res, response);
  }
}
