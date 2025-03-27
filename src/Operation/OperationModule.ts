// src/Operation/OperationModule.ts
import { Module } from '@nestjs/common';

import { TradingUseCases } from './Application';
import { OperationRepository } from './Infrastructure/OperationRepository';
import { OperationRepositoryImpl } from './Infrastructure/OperationRepositoryImpl';
import { DeleteController } from './Presentation/Controllers/DeleteController';
import { GetController } from './Presentation/Controllers/GetController';
import { PostController } from './Presentation/Controllers/PostController';
import { PutController } from './Presentation/Controllers/PutController';

@Module({
  controllers: [GetController, PostController, PutController, DeleteController],
  providers: [
    ...TradingUseCases,
    {
      provide: OperationRepository,
      useClass: OperationRepositoryImpl
    }
  ]
})
export class OperationModule {}
