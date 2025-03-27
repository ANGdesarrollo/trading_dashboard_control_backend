import { Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';

import { GetFileByIdUseCase } from '../../Application/GetFileByIdUseCase';
import { ListFileUseCase } from '../../Application/ListFileUseCase';
import { FileDomain } from '../../Domain/Entities/FileDomain';

@Controller('file')
export class GetController
{
  constructor(
    private readonly listFileUseCase: ListFileUseCase,
    private readonly getFileByIdUseCase: GetFileByIdUseCase
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<FileDomain[]>
  {
    return this.listFileUseCase.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id', ParseUUIDPipe) id: string): Promise<FileDomain>
  {
    return this.getFileByIdUseCase.execute(id);
  }
}
