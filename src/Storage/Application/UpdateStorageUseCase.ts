import { Injectable, NotFoundException } from '@nestjs/common';

import { StorageDomain } from '../Domain/Entities/StorageDomain';
import { StorageRepository } from '../Infrastructure/StorageRepository';
import { UpdateStorageDto } from '../Presentation/Dtos/UpdateStorageDto';

@Injectable()
export class UpdateStorageUseCase {
  constructor(private readonly repository: StorageRepository) {}

  async execute(id: string, payload: UpdateStorageDto): Promise<StorageDomain> {
    const storage = await this.repository.findOneBy('id', id);

    if (!storage) {
      throw new NotFoundException(`Storage with id ${id} not found`);
    }

    return this.repository.update(id, payload);
  }
}
