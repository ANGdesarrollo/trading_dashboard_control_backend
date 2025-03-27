import { Injectable, NotFoundException } from '@nestjs/common';

import { MinioService } from '../Domain/Services/MinioService';
import { FileRepository } from '../Infrastructure/FileRepository';

@Injectable()
export class GetFileUseCase
{
  constructor(
    private readonly repository: FileRepository,
    private readonly minioService: MinioService
  ) {}

  async execute(id: string): Promise<{ buffer: Buffer; fileName: string; mimeType: string }>
  {
    const storage = await this.repository.findOneBy('id', id);

    if (!storage)
    {
      throw new NotFoundException(`File with id ${id} not found`);
    }

    // Get the file from MinIO
    const buffer = await this.minioService.getFile(storage.path);

    return {
      buffer,
      fileName: storage.fileName,
      mimeType: storage.mimeType
    };
  }
}
