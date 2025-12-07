import { inject, injectable } from 'inversify';
import {OfferEntity, OfferModel} from '../data-models/offer/offer.js';
import {TYPES} from '../../autofac-types.js';
import {OfferRepository} from '../data-models/offer/OfferRepository.js';
import {CommentRepository} from '../data-models/comment/CommentRepository.js';
import {CreateOfferDTO} from '../data-models/offer/dto/CreateOfferDto.js';
import {UpdateOfferDTO} from '../data-models/offer/dto/UpdateOfferDto.js';
import {ExistsDocumentService} from './IExistsDocumentService.js';

@injectable()
export class OfferService implements ExistsDocumentService {
  constructor(
    @inject(TYPES.OfferRepository)
    private readonly offerRepository: OfferRepository,
    @inject(TYPES.CommentRepository)
    private readonly commentRepository: CommentRepository
  ) {}

  public async create(dto: CreateOfferDTO, authorId: string): Promise<OfferEntity> {
    return this.offerRepository.create({
      ...dto,
      author: authorId,
      commentsCount: 0,
      rating: 0
    });
  }

  public async update(id: string, dto: UpdateOfferDTO): Promise<OfferEntity | null> {
    return this.offerRepository.updateById(id, dto);
  }

  public async delete(id: string): Promise<void> {
    await this.offerRepository.deleteById(id);
  }

  public async findById(id: string): Promise<OfferEntity | null> {
    return this.offerRepository.findById(id);
  }

  public async findByCity(city: string): Promise<OfferEntity[]> {
    return this.offerRepository.findByCity(city);
  }

  public async findPremium(city: string): Promise<OfferEntity[]> {
    return this.offerRepository.findPremium(city);
  }

  public async findFavorites(): Promise<OfferEntity[]> {
    return this.offerRepository.findFavorites();
  }

  public async recalculateCommentsCount(offerId: string): Promise<void> {
    const count = await this.commentRepository.model.countDocuments({ offer: offerId });
    await this.offerRepository.updateById(offerId, { commentsCount: count });
  }

  public async recalculateRating(offerId: string): Promise<void> {
    const comments = await this.commentRepository.model.find({ offer: offerId }).select('rating');
    if (comments.length === 0) {
      await this.offerRepository.updateById(offerId, { rating: 0 });
      return;
    }

    const avgRating = comments.reduce((sum, c) => sum + c.rating, 0) / comments.length;
    const rounded = Math.round(avgRating * 10) / 10;

    await this.offerRepository.updateById(offerId, { rating: rounded });
  }

  async exists(id: string): Promise<boolean> {
    return Boolean(await OfferModel.exists({ _id: id }));
  }

  public async list(userId?: string) {
    const offers = await this.offerRepository.findAll() || [];

    if (!userId) {
      return offers.map((o) => ({ ...o, isFavorite: false }));
    }

    const favorites = await this.offerRepository.findFavorites();
    const favoriteIds = new Set(favorites.map((f) => f.id));

    return offers.map((o) => ({
      ...o,
      isFavorite: favoriteIds.has(o.id),
    }));
  }
}
