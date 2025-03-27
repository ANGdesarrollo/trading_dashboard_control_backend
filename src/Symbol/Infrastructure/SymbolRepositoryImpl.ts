import { Injectable } from '@nestjs/common';
import { BasePrismaRepositoryImpl } from 'src/Shared/Infrastructure/BasePrismaRepositoryImpl';

import { PrismaService } from '../../Shared/Infrastructure/DatabaseService';
import { SymbolDomain } from '../Domain/Entities/SymbolDomain';
import { SymbolDto } from '../Presentation/Dtos/SymbolDto';

import { SymbolRepository } from './SymbolRepository';

@Injectable()
export class SymbolRepositoryImpl extends BasePrismaRepositoryImpl<SymbolDto, SymbolDomain> implements SymbolRepository
{
  constructor(prisma: PrismaService)
  {
    super(prisma, 'symbol');
  }
}
