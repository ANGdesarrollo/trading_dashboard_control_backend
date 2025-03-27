// src/Symbol/SymbolModule.ts
import { Module } from '@nestjs/common';

import { SymbolUseCases } from './Application';
import { SymbolRepository } from './Infrastructure/SymbolRepository';
import { SymbolRepositoryImpl } from './Infrastructure/SymbolRepositoryImpl';
import { DeleteController } from './Presentation/Controllers/DeleteController';
import { GetController } from './Presentation/Controllers/GetController';
import { PostController } from './Presentation/Controllers/PostController';
import { PutController } from './Presentation/Controllers/PutController';

@Module({
  controllers: [GetController, PostController, PutController, DeleteController],
  providers: [
    ...SymbolUseCases,
    {
      provide: SymbolRepository,
      useClass: SymbolRepositoryImpl
    }
  ]
})
export class SymbolModule {}
