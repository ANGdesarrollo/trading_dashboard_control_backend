import { Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';

import { GetOperationByIdUseCase } from '../../Application/GetOperationByIdUseCase';
import { ListOperationUseCase } from '../../Application/ListOperationUseCase';
import { OperationDomain } from '../../Domain/Entities/OperationDomain';

@Controller('trading')
export class GetController
{
  constructor(
    private readonly listTradingUseCase: ListOperationUseCase,
    private readonly getTradingByIdUseCase: GetOperationByIdUseCase
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<OperationDomain[]>
  {
    return this.listTradingUseCase.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id', ParseUUIDPipe) id: string): Promise<OperationDomain>
  {
    return this.getTradingByIdUseCase.execute(id);
  }
}
