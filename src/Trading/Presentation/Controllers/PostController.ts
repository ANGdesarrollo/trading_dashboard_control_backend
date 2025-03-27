import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { CreateTradingUseCase } from '../../Application/CreateTradingUseCase';
import { TradingDomain } from '../../Domain/Entities/TradingDomain';
import { TradingDto } from '../Dtos/TradingDto';

@Controller('trading')
export class PostController
{
  constructor(private readonly createTradingUseCase: CreateTradingUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: TradingDto): Promise<TradingDomain>
{
    return this.createTradingUseCase.execute(body);
  }
}
