import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import {Controller} from '../controller.js';
import {OfferCreateDTO, OfferDTO} from '../types/offer-dto.js';

const offers: Array<any> = [];

export class OfferController extends Controller {
  constructor() {
    super('/offers');
    this.registerRoutes();
  }

  public registerRoutes(): void {
    this.router.get('/', asyncHandler(this.getAll.bind(this)));
    this.router.post('/', asyncHandler(this.create.bind(this)));
    this.router.get('/:offerId', asyncHandler(this.getById.bind(this)));
    this.router.patch('/:offerId', asyncHandler(this.update.bind(this)));
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
