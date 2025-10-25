import { inject, injectable } from 'inversify';
import {OfferEntity} from '../data-models/offer/offer.js';
import {TYPES} from '../../autofac-types.js';
import {OfferRepository} from '../data-models/offer/OfferRepository.js';
import {CommentRepository} from '../data-models/comment/CommentRepository.js';
import {CreateOfferDto} from '../data-models/offer/dto/CreateOfferDto.js';
import {UpdateOfferDto} from '../data-models/offer/dto/UpdateOfferDto.js';

@injectable()
export class OfferService {
  constructor(
    @inject(TYPES.OfferRepository)
    private readonly offerRepository: OfferRepository,
    @inject(TYPES.CommentRepository)
    private readonly commentRepository: CommentRepository
  ) {}

  public async create(dto: CreateOfferDto): Promise<OfferEntity> {
    return this.offerRepository.create({
      ...dto,
      author: dto.authorId,
      commentsCount: 0,
    });
  }

  public async update(id: string, dto: UpdateOfferDto): Promise<OfferEntity | null> {
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
}
