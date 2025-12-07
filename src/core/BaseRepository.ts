import { Model, Document } from 'mongoose';
import {IEntityRepository} from './IEntityRepository.js';

export abstract class BaseRepository<T extends Document> implements IEntityRepository<T> {
  protected constructor(readonly model: Model<T>) {}

  public async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  public async findAll(): Promise<T[] | null> {
    return this.model.find().exec();
  }

  public async deleteById(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  public async updateById(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    ).exec();
  }

  public async create(data: Partial<T>): Promise<T> {
    const document = new this.model(data);
    return document.save();
  }
}
