import { Injectable, NotFoundException } from '@nestjs/common';

import { StorageDomain } from '../Domain/Entities/StorageDomain';
import { StorageRepository } from '../Infrastructure/StorageRepository';

@Injectable()
export class GetStorageByIdUseCase {
  constructor(private readonly repository: StorageRepository) {}

  async execute(id: string): Promise<StorageDomain> {
    const storage = await this.repository.findOneBy('id', id);

    if (!storage) {
      throw new NotFoundException(`Storage with id ${id} not found`);
    }

    return storage;
  }
}
