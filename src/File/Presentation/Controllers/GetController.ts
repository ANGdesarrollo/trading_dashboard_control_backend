import { Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';

import { GetFileByIdUseCase } from '../../Application/GetFileByIdUseCase';
import { ListFileUseCase } from '../../Application/ListFileUseCase';
import { FileDomain } from '../../Domain/Entities/FileDomain';

@Controller('storage')
export class GetController {
  constructor(
    private readonly listStorageUseCase: ListFileUseCase,
    private readonly getStorageByIdUseCase: GetFileByIdUseCase
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<FileDomain[]> {
    return this.listStorageUseCase.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id', ParseUUIDPipe) id: string): Promise<FileDomain> {
    return this.getStorageByIdUseCase.execute(id);
  }
}
