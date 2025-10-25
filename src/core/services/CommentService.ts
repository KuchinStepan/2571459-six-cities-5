import { inject, injectable } from 'inversify';
import {CommentRepository} from '../data-models/comment/CommentRepository.js';
import {TYPES} from '../../autofac-types.js';
import {OfferService} from './OfferService.js';
import {CreateCommentDto} from '../data-models/comment/dto/CreateCommentDto.js';
import {CommentEntity} from '../data-models/comment/comment.js';


@injectable()
export class CommentService {
  constructor(
    @inject(TYPES.CommentRepository)
    private readonly commentRepository: CommentRepository,
    @inject(TYPES.OfferService)
    private readonly offerService: OfferService
  ) {}

  public async create(dto: CreateCommentDto): Promise<CommentEntity> {
    const comment = await this.commentRepository.create({
      text: dto.text,
      rating: dto.rating,
      author: dto.authorId,
      offer: dto.offerId,
    });

    await this.offerService.recalculateCommentsCount(dto.offerId);
    await this.offerService.recalculateRating(dto.offerId);

    return comment;
  }

  public async findByOfferId(offerId: string): Promise<CommentEntity[]> {
    return this.commentRepository.findByOfferId(offerId);
  }
}
