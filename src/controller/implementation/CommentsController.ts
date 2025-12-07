import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { Controller } from '../controller.js';
import { CommentDTO } from '../types/comment-dto.js';
import {ValidateObjectIdMiddleware} from '../middlewares/implementation/ObjectIdMiddleware.js';
import {ValidateDtoMiddleware} from '../middlewares/implementation/ValidateDtoMiddleware.js';
import {CreateCommentDTO} from '../../core/data-models/comment/dto/CreateCommentDto.js';

const comments: Array<any> = [];

export class CommentsController extends Controller {
  constructor() {
    super('/comments');
    this.registerRoutes();
  }

  public registerRoutes(): void {
    this.addRoute({
      path: '/:offerId',
      method: 'post',
      handler: this.create,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(CreateCommentDTO)
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: 'get',
      handler: this.index,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
  }

  private async index(req: Request, res: Response): Promise<void> {
    const { offerId } = req.params;

    const list = comments.filter((c) => c.offerId === offerId);

    const dtos = plainToInstance(CommentDTO, list, {
      excludeExtraneousValues: true
    });

    this.ok(res, dtos);
  }

  private async create(req: Request, res: Response): Promise<void> {
    const dto = plainToInstance(CreateCommentDTO, req.body, {
      excludeExtraneousValues: true
    });

    const created = {
      id: (Math.random() * 1e18).toString(36),
      text: dto.text,
      rating: dto.rating,
      offerId: dto.offerId,
      userId: req.user?.id ?? null, // пока нет авторизации
      createdAt: new Date().toISOString()
    };

    comments.push(created);

    const result = plainToInstance(CommentDTO, created, {
      excludeExtraneousValues: true
    });

    this.created(res, result);
  }
}
