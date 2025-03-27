import { Injectable } from '@nestjs/common';

import { TradingDomain } from '../Domain/Entities/TradingDomain';
import { TradingRepository } from '../Infrastructure/TradingRepository';
import { TradingDto } from '../Presentation/Dtos/TradingDto';


@Injectable()
export class CreateTradingUseCase
{
  constructor(private readonly repository: TradingRepository) {}

  async execute(payload: TradingDto): Promise<TradingDomain>
{
    return this.repository.create(payload);
  }
}
