import { Injectable } from '@nestjs/common';
import { BasePrismaRepositoryImpl } from 'src/Shared/Infrastructure/BasePrismaRepositoryImpl';

import { PrismaService } from '../../Shared/Infrastructure/DatabaseService';
import { OperationDomain } from '../Domain/Entities/OperationDomain';
import { OperationDto } from '../Presentation/Dtos/OperationDto';

import { OperationRepository } from './OperationRepository';


@Injectable()
export class OperationRepositoryImpl extends BasePrismaRepositoryImpl<OperationDto, OperationDomain> implements OperationRepository
{
  constructor(prisma: PrismaService)
{
    super(prisma, 'trading');
  }
}
