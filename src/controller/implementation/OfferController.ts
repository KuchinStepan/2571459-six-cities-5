import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import {Controller} from '../controller.js';
import {OfferCreateDTO, OfferDTO} from '../types/offer-dto.js';
import {ValidateDtoMiddleware} from '../middlewares/implementation/ValidateDtoMiddleware.js';
import {ValidateObjectIdMiddleware} from '../middlewares/implementation/ObjectIdMiddleware.js';
import {DocumentExistsMiddleware} from '../middlewares/implementation/DocumentExistsMiddleware.js';
import {OfferService} from '../../core/services/OfferService.js';
import {UploadFileMiddleware} from '../middlewares/implementation/UploadMiddlewareOptions.js';

const offers: Array<any> = [];

export class OfferController extends Controller {
  constructor(offerService: OfferService) {
    super('/offers');
    this.registerRoutes();
    this.offerService = offerService;
  }

  private readonly offerService: OfferService;

  public registerRoutes(): void {
    this.router.get('/', asyncHandler(this.getAll.bind(this)));

    this.addRoute({
      method: 'post',
      path: '/',
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(OfferCreateDTO)
      ]
    });

    this.addRoute({
      method: 'patch',
      path: '/:offerId',
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(OfferCreateDTO),
        new DocumentExistsMiddleware('offerId', this.offerService)
      ]
    });

    this.addRoute({
      method: 'get',
      path: '/:offerId',
      handler: this.getById,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware('offerId', this.offerService)
      ]
    });

    this.addRoute({
      method: 'post',
      path: '/photos',
      handler: this.uploadPhotos,
      middlewares: [
        new UploadFileMiddleware({
          fieldName: 'photos',
          multiple: true,
          maxCount: 6,
          uploadDir: process.env.UPLOAD_DIR ?? './upload',
        })
      ]
    });

    this.router.delete('/:offerId', asyncHandler(this.remove.bind(this)));
  }

  private async getAll(req: Request, res: Response): Promise<void> {
    const limit = Number(req.query.limit ?? 60);
    const slice = offers.slice(0, limit);
    const dtos = plainToInstance(OfferDTO, slice, { excludeExtraneousValues: true });
    this.ok(res, dtos);

  }

  private async create(req: Request, res: Response): Promise<void> {
    const dto = plainToInstance(OfferCreateDTO, req.body, { excludeExtraneousValues: true });

    const created = {
      id: (Math.random() * 1e18).toString(36),
      title: dto.title,
      description: dto.description,
      postDate: dto.postDate ?? new Date().toISOString(),
      city: dto.city,
      previewImage: dto.previewImage,
      photos: dto.photos ?? [],
      isPremium: dto.isPremium ?? false,
      isFavorite: dto.isFavorite ?? false,
      rating: dto.rating ?? 1,
      type: dto.type,
      rooms: dto.rooms,
      guests: dto.guests,
      price: dto.price,
      goods: dto.goods ?? [],
      author: dto.author ?? null,
      commentsCount: 0,
      coordinates: dto.coordinates,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    offers.push(created);
    const response = plainToInstance(OfferDTO, created, { excludeExtraneousValues: true });
    this.created(res, response);

  }

  private async uploadPhotos(req: Request, res: Response) {
    const files = req.files as Express.Multer.File[];

    const urls = files.map((file) => `/upload/${file.filename}`);

    return this.ok(res, { photos: urls });
  }

  private async getById(req: Request, res: Response): Promise<void> {
    const { offerId } = req.params;
    const found = offers.find((o) => o.id === offerId);
    if (!found) {
      this.notFound(res, `Offer ${offerId} not found`);
      return;
    }
    const response = plainToInstance(OfferDTO, found, { excludeExtraneousValues: true });
    this.ok(res, response);

  }

  private async update(req: Request, res: Response): Promise<void> {
    const { offerId } = req.params;
    const dto = plainToInstance(OfferCreateDTO, req.body, { excludeExtraneousValues: true });

    const idx = offers.findIndex((o) => o.id === offerId);
    if (idx === -1) {
      this.notFound(res, `Offer ${offerId} not found`);
      return;
    }

    const updated = {
      ...offers[idx],
      ...dto,
      updatedAt: new Date().toISOString(),
    };

    offers[idx] = updated;

    const response = plainToInstance(OfferDTO, updated, { excludeExtraneousValues: true });
    this.ok(res, response);

  }

  private async remove(req: Request, res: Response): Promise<void> {
    const { offerId } = req.params;
    const idx = offers.findIndex((o) => o.id === offerId);
    if (idx === -1) {
      this.notFound(res, `Offer ${offerId} not found`);
      return;
    }

    offers.splice(idx, 1);
    this.noContent(res);

  }

  public async getPremiumByCity(req: Request, res: Response): Promise<void> {
    const { city } = req.params as { city: string };
    const filtered = offers.filter((o) => o.city === city && o.isPremium);
    const dtos = plainToInstance(OfferDTO, filtered, { excludeExtraneousValues: true });
    this.ok(res, dtos);
  }
}
