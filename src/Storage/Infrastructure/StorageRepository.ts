import { BaseRepository } from '../../Shared/Domain/Repositories/BaseRepository';
import { StorageDomain } from '../Domain/Entities/StorageDomain';
import { StorageDto } from '../Presentation/Dtos/StorageDto';

export abstract class StorageRepository extends BaseRepository<StorageDto, StorageDomain> {}
