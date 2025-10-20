import { Model, Document } from 'mongoose';
import {IEntityRepository} from './IEntityRepository.js';

export abstract class BaseRepository<T extends Document> implements IEntityRepository<T> {
  protected constructor(protected readonly model: Model<T>) {}

  public async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  public async create(data: Partial<T>): Promise<T> {
    const document = new this.model(data);
    return document.save();
  }
}
