import { Body, Controller, HttpCode, HttpStatus, Param, ParseUUIDPipe, Put } from '@nestjs/common';

import { UpdateTradingUseCase } from '../../Application/UpdateTradingUseCase';
import { TradingDomain } from '../../Domain/Entities/TradingDomain';
import { UpdateTradingDto } from '../Dtos/UpdateTradingDto';

@Controller('trading')
export class PutController
{
  constructor(private readonly updateTradingUseCase: UpdateTradingUseCase) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateTradingDto
  ): Promise<TradingDomain>
{
    return this.updateTradingUseCase.execute(id, body);
  }
}
