import {IEntityRepository} from '../../IEntityRepository.js';
import {IUser} from './IUser.js';


export interface IUserRepository extends IEntityRepository<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
}
