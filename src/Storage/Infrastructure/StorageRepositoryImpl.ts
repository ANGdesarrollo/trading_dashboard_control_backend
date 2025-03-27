import { Injectable } from '@nestjs/common';
import { BasePrismaRepositoryImpl } from 'src/Shared/Infrastructure/BasePrismaRepositoryImpl';

import { PrismaService } from '../../Shared/Infrastructure/DatabaseService';
import { StorageDomain } from '../Domain/Entities/StorageDomain';
import { StorageDto } from '../Presentation/Dtos/StorageDto';

import { StorageRepository } from './StorageRepository';

@Injectable()
export class StorageRepositoryImpl extends BasePrismaRepositoryImpl<StorageDto, StorageDomain> implements StorageRepository {
  constructor(prisma: PrismaService) {
    super(prisma, 'storage');
  }
}
