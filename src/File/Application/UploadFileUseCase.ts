import { Injectable } from '@nestjs/common';

import { FileDomain } from '../Domain/Entities/FileDomain';
import { FileService } from '../Domain/Services/FileService';
import { MinioService } from '../Domain/Services/MinioService';
import { FileRepository } from '../Infrastructure/FileRepository';
import { UploadFileDto } from '../Presentation/Dtos/UploadFileDto';

@Injectable()
export class UploadFileUseCase
{
  constructor(
    private readonly repository: FileRepository,
    private readonly fileService: FileService,
    private readonly minioService: MinioService
  ) {}

  async execute(dto: UploadFileDto): Promise<FileDomain>
  {
    // Generate a unique file name
    const fileName = this.fileService.generateFileName(dto.originalName);

    // Set the path where the file will be stored in MinIO
    const folder = 'uploads';
    const filePath = this.fileService.getFilePath(folder, fileName);

    // Detect MIME type based on file extension
    const mimeType =
      dto.mimeType || this.fileService.detectMimeType(dto.originalName);

    // Upload the file to MinIO
    const fileUrl = await this.minioService.uploadFile(
      dto.buffer,
      filePath,
      { 'Content-Type': mimeType },
      dto.isPublic
    );

    // Create a record in the database
    return await this.repository.create({
      fileName,
      originalName: dto.originalName,
      path: filePath,
      mimeType,
      size: dto.buffer.length,
      isPublic: dto.isPublic !== false,
      url: fileUrl
    });
  }
}
