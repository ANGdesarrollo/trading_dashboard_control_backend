import { Injectable } from '@nestjs/common';
import { BasePrismaRepositoryImpl } from 'src/Shared/Infrastructure/BasePrismaRepositoryImpl';

import { PrismaService } from '../../Shared/Infrastructure/DatabaseService';
import { TradingDomain } from '../Domain/Entities/TradingDomain';
import { TradingDto } from '../Presentation/Dtos/TradingDto';

import { TradingRepository } from './TradingRepository';


@Injectable()
export class TradingRepositoryImpl extends BasePrismaRepositoryImpl<TradingDto, TradingDomain> implements TradingRepository
{
  constructor(prisma: PrismaService)
{
    super(prisma, 'trading');
  }
}
