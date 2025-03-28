import { Injectable, NotFoundException } from '@nestjs/common';

import { MinioService } from '../Domain/Services/MinioService';
import { FileRepository } from '../Infrastructure/FileRepository';

@Injectable()
export class DeleteFileUseCase
{
  constructor(
    private readonly repository: FileRepository,
    private readonly minioService: MinioService
  ) {}

  async execute(id: string): Promise<void>
  {
    const file = await this.repository.findOneBy('id', id);

    if (!file)
    {
      throw new NotFoundException(`File with id ${id} not found`);
    }

    await Promise.all([
      this.minioService.deleteFile(file.path),
      this.repository.delete(id)
    ]);
  }
}
