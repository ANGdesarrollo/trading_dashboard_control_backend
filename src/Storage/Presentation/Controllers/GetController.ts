import { Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';

import { GetStorageByIdUseCase } from '../../Application/GetStorageByIdUseCase';
import { ListStorageUseCase } from '../../Application/ListStorageUseCase';
import { StorageDomain } from '../../Domain/Entities/StorageDomain';

@Controller('storage')
export class GetController {
  constructor(
    private readonly listStorageUseCase: ListStorageUseCase,
    private readonly getStorageByIdUseCase: GetStorageByIdUseCase
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<StorageDomain[]> {
    return this.listStorageUseCase.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id', ParseUUIDPipe) id: string): Promise<StorageDomain> {
    return this.getStorageByIdUseCase.execute(id);
  }
}
