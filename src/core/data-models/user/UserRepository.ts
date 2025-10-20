import { injectable } from 'inversify';
import {BaseRepository} from '../../BaseRepository.js';
import {IUserRepository} from './IUserRepository.js';
import {UserEntity, UserModel} from './user.js';

@injectable()
export class UserRepository extends BaseRepository<UserEntity> implements IUserRepository {
  constructor() {
    super(UserModel);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    return this.model.findOne({ email }).exec();
  }
}
