import { Injectable, NotFoundException } from '@nestjs/common';

import { StorageRepository } from '../Infrastructure/StorageRepository';

@Injectable()
export class DeleteStorageUseCase {
  constructor(private readonly repository: StorageRepository) {}

  async execute(id: string): Promise<void> {
    const storage = await this.repository.findOneBy('id', id);

    if (!storage) {
      throw new NotFoundException(`Storage with id ${id} not found`);
    }

    await this.repository.delete(id);
  }
}
