import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { CreateStorageUseCase } from '../../Application/CreateStorageUseCase';
import { StorageDomain } from '../../Domain/Entities/StorageDomain';
import { StorageDto } from '../Dtos/StorageDto';

@Controller('storage')
export class PostController {
  constructor(private readonly createStorageUseCase: CreateStorageUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: StorageDto): Promise<StorageDomain> {
    return this.createStorageUseCase.execute(body);
  }
}
