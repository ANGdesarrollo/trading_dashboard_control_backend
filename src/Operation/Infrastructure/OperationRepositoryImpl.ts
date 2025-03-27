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
    super(prisma, 'operation');
  }

  async list(): Promise<OperationDomain[]>
  {
    try
    {
      return await this.repository[this.entityName].findMany({
        include: {
          symbol: true
        }
      });
    }
    catch (error)
    {
      this.handlePrismaError(error, 'list');
    }
  }

  async findOneBy<K extends keyof OperationDomain>(fieldName: K, fieldValue: OperationDomain[K]): Promise<OperationDomain>
  {
    try
    {
      return await this.repository[this.entityName].findUniqueOrThrow({
        where: {
          [fieldName]: fieldValue
        },
        include: {
          symbol: true
        }
      });
    }
    catch (error)
    {
      this.handlePrismaError(error, 'findOneBy');
    }
  }
}
