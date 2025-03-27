import { Injectable, NotFoundException } from '@nestjs/common';

import { FileRepository } from '../Infrastructure/FileRepository';

@Injectable()
export class DeleteFileUseCase
{
  constructor(private readonly repository: FileRepository) {}

  async execute(id: string): Promise<void>
  {
    const storage = await this.repository.findOneBy('id', id);

    if (!storage)
    {
      throw new NotFoundException(`Storage with id ${id} not found`);
    }

    await this.repository.delete(id);
  }
}
