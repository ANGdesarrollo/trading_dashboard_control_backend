import { Injectable } from '@nestjs/common';

import { StorageDomain } from '../Domain/Entities/StorageDomain';
import { StorageRepository } from '../Infrastructure/StorageRepository';
import { StorageDto } from '../Presentation/Dtos/StorageDto';

@Injectable()
export class CreateStorageUseCase {
  constructor(private readonly repository: StorageRepository) {}

  async execute(payload: StorageDto): Promise<StorageDomain> {
    return this.repository.create(payload);
  }
}
