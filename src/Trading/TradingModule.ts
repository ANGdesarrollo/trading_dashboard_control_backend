// src/Trading/TradingModule.ts
import { Module } from '@nestjs/common';

import { TradingUseCases } from './Application';
import { TradingRepository } from './Infrastructure/TradingRepository';
import { TradingRepositoryImpl } from './Infrastructure/TradingRepositoryImpl';
import { GetController } from './Presentation/Controllers/GetController';
import { PostController } from './Presentation/Controllers/PostController';
import { PutController } from './Presentation/Controllers/PutController';
import { DeleteController } from './Presentation/Controllers/DeleteController';

@Module({
  controllers: [GetController, PostController, PutController, DeleteController],
  providers: [
    ...TradingUseCases,
    {
      provide: TradingRepository,
      useClass: TradingRepositoryImpl
    }
  ]
})
export class TradingModule {}
