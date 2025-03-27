import { Injectable } from '@nestjs/common';
import { BasePrismaRepositoryImpl } from 'src/Shared/Infrastructure/BasePrismaRepositoryImpl';

import { PrismaService } from '../../Shared/Infrastructure/DatabaseService';
import { FileDomain } from '../Domain/Entities/FileDomain';
import { FileDto } from '../Presentation/Dtos/FileDto';

import { FileRepository } from './FileRepository';

@Injectable()
export class FileRepositoryImpl extends BasePrismaRepositoryImpl<FileDto, FileDomain> implements FileRepository
{
  constructor(prisma: PrismaService)
  {
    super(prisma, 'file');
  }
}
