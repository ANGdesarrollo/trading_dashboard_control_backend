import { Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';

import { GetTradingByIdUseCase } from '../../Application/GetTradingByIdUseCase';
import { ListTradingUseCase } from '../../Application/ListTradingUseCase';
import { TradingDomain } from '../../Domain/Entities/TradingDomain';

@Controller('trading')
export class GetController
{
  constructor(
    private readonly listTradingUseCase: ListTradingUseCase,
    private readonly getTradingByIdUseCase: GetTradingByIdUseCase
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<TradingDomain[]>
  {
    return this.listTradingUseCase.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id', ParseUUIDPipe) id: string): Promise<TradingDomain>
  {
    return this.getTradingByIdUseCase.execute(id);
  }
}
