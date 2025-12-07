import { inject, injectable } from 'inversify';
import {UserRepository} from '../data-models/user/UserRepository.js';
import {TYPES} from '../../autofac-types.js';
import {UserEntity} from '../data-models/user/user.js';
import {UpdateUserDTO} from '../data-models/user/dto/UpdateUserDto.js';
import {CreateUserDTO} from '../data-models/user/dto/CreateUserDto.js';

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  public async create(dto: CreateUserDTO): Promise<UserEntity> {
    return this.userRepository.create(dto);
  }

  public async update(id: string, dto: UpdateUserDTO): Promise<UserEntity | null> {
    return this.userRepository.updateById(id, dto);
  }

  public async findById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findByEmail(email);
  }
}
