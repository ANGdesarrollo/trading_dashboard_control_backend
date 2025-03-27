import { Injectable } from '@nestjs/common';

import { TradingDomain } from '../Domain/Entities/TradingDomain';
import { TradingRepository } from '../Infrastructure/TradingRepository';

@Injectable()
export class ListTradingUseCase
{
  constructor(private readonly repository: TradingRepository) {}

  async execute(): Promise<TradingDomain[]>
{
    return this.repository.list();
  }
}
