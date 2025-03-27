import { Injectable, NotFoundException } from '@nestjs/common';

import { FileDomain } from '../Domain/Entities/FileDomain';
import { FileRepository } from '../Infrastructure/FileRepository';

@Injectable()
export class GetFileByIdUseCase
{
  constructor(private readonly repository: FileRepository) {}

  async execute(id: string): Promise<FileDomain>
  {
    const storage = await this.repository.findOneBy('id', id);

    if (!storage)
    {
      throw new NotFoundException(`Storage with id ${id} not found`);
    }

    return storage;
  }
}
