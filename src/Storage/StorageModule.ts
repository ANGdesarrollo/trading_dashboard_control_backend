// src/Storage/StorageModule.ts
import { Module } from '@nestjs/common';

import { StorageUseCases } from './Application';
import { StorageRepository } from './Infrastructure/StorageRepository';
import { StorageRepositoryImpl } from './Infrastructure/StorageRepositoryImpl';
import { GetController } from './Presentation/Controllers/GetController';
import { PostController } from './Presentation/Controllers/PostController';
import { PutController } from './Presentation/Controllers/PutController';
import { DeleteController } from './Presentation/Controllers/DeleteController';

@Module({
  controllers: [GetController, PostController, PutController, DeleteController],
  providers: [
    ...StorageUseCases,
    {
      provide: StorageRepository,
      useClass: StorageRepositoryImpl
    }
  ]
})
export class StorageModule {}
