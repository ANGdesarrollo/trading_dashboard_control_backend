// src/File/FileModule.ts
import { Module } from '@nestjs/common';

import { StorageUseCases } from './Application';
import { FileService } from './Domain/Services/FileService';
import { MinioService } from './Domain/Services/MinioService';
import { FileRepository } from './Infrastructure/FileRepository';
import { FileRepositoryImpl } from './Infrastructure/FileRepositoryImpl';
import { DeleteController } from './Presentation/Controllers/DeleteController';
import { GetController } from './Presentation/Controllers/GetController';
import { PostController } from './Presentation/Controllers/PostController';
import { PutController } from './Presentation/Controllers/PutController';

@Module({
  controllers: [GetController, PostController, PutController, DeleteController],
  providers: [
    ...StorageUseCases,
    {
      provide: FileRepository,
      useClass: FileRepositoryImpl
    },
    MinioService,
    FileService
  ],
  exports: [MinioService, FileService]
})
export class FileModule {}
