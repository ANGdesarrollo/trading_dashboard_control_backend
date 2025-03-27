import { Injectable } from '@nestjs/common';

import { BasePrismaRepositoryImpl } from '../../Shared/Infrastructure/BasePrismaRepositoryImpl';
import { PrismaService } from '../../Shared/Infrastructure/DatabaseService';
import { UserDomain } from '../Domain/Entities/UserDomain';
import { RegisterUserDto } from '../Presentation/Dtos/RegisterUserDto';

import { UserRepository } from './UserRepository';


@Injectable()
export class UserRepositoryImpl extends BasePrismaRepositoryImpl<RegisterUserDto, UserDomain> implements UserRepository
{
  constructor(prisma: PrismaService)
  {
    super(prisma, 'user');
  }
}
