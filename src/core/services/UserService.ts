import { inject, injectable } from 'inversify';
import {UserRepository} from '../data-models/user/UserRepository.js';
import {TYPES} from '../../autofac-types.js';
import {CreateUserDto} from '../data-models/user/dto/CreateUserDto.js';
import {UserEntity} from '../data-models/user/user.js';
import {UpdateUserDto} from '../data-models/user/dto/UpdateUserDto.js';

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  public async create(dto: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.create(dto);
  }

  public async update(id: string, dto: UpdateUserDto): Promise<UserEntity | null> {
    return this.userRepository.updateById(id, dto);
  }

  public async findById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findByEmail(email);
  }
}
