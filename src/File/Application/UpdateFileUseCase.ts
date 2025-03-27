import { Injectable, NotFoundException } from '@nestjs/common';

import { FileDomain } from '../Domain/Entities/FileDomain';
import { FileRepository } from '../Infrastructure/FileRepository';
import { UpdateFileDto } from '../Presentation/Dtos/UpdateFileDto';

@Injectable()
export class UpdateFileUseCase
{
  constructor(private readonly repository: FileRepository) {}

  async execute(id: string, payload: UpdateFileDto): Promise<FileDomain>
  {
    const storage = await this.repository.findOneBy('id', id);

    if (!storage)
    {
      throw new NotFoundException(`Storage with id ${id} not found`);
    }

    return this.repository.update(id, payload);
  }
}
