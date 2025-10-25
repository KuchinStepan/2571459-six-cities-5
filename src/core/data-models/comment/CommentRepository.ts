import { injectable } from 'inversify';
import { BaseRepository } from '../../BaseRepository.js';
import { CommentEntity, CommentModel } from './comment.js';
import {ICommentRepository} from './ICommentRepository.js';

@injectable()
export class CommentRepository extends BaseRepository<CommentEntity> implements ICommentRepository {
  constructor() {
    super(CommentModel);
  }

  public async findByOfferId(offerId: string): Promise<CommentEntity[]> {
    return this.model.find({ offer: offerId }).sort({ date: -1 }).limit(50).exec();
  }
}
