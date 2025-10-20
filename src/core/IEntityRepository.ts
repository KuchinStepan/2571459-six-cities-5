export interface IEntityRepository<T> {
  findById(id: string): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
}
