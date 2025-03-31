import { Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';

import { GetOperationByIdUseCase } from '../../Application/GetOperationByIdUseCase';
import { ListOperationUseCase } from '../../Application/ListOperationUseCase';
import { OperationDomain } from '../../Domain/Entities/OperationDomain';

@Controller('operation')
export class GetController
{
  constructor(
    private readonly listOperationUseCase: ListOperationUseCase,
    private readonly getOperationByIdUseCase: GetOperationByIdUseCase
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<OperationDomain[]>
  {
    return this.listOperationUseCase.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id', ParseUUIDPipe) id: string): Promise<OperationDomain>
  {
    return this.getOperationByIdUseCase.execute(id);
  }
}
