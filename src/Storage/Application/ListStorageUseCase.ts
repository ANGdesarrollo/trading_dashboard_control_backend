import { Injectable } from '@nestjs/common';

import { StorageDomain } from '../Domain/Entities/StorageDomain';
import { StorageRepository } from '../Infrastructure/StorageRepository';

@Injectable()
export class ListStorageUseCase {
  constructor(private readonly repository: StorageRepository) {}

  async execute(): Promise<StorageDomain[]> {
    return this.repository.list();
  }
}
