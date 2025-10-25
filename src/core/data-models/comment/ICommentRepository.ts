import {IEntityRepository} from '../../IEntityRepository.js';
import {IComment} from './IComment.js';


export interface ICommentRepository extends IEntityRepository<IComment> {
  findByOfferId(offerId: string): Promise<IComment[]>;
}
