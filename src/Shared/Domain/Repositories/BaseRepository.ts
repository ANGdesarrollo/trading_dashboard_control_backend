export abstract class BaseRepository<D, T>
{
  abstract create(payload: Partial<D>): Promise<T>
  abstract findOneBy<K extends keyof T>(fieldName: K, fieldValue: T[K]): Promise<T | null>;
}
