import { Injectable, NotFoundException } from '@nestjs/common';

import { TradingDomain } from '../Domain/Entities/TradingDomain';
import { TradingRepository } from '../Infrastructure/TradingRepository';

@Injectable()
export class GetTradingByIdUseCase
{
  constructor(private readonly repository: TradingRepository) {}

  async execute(id: string): Promise<TradingDomain>
  {
    const trading = await this.repository.findOneBy('id', id);

    if (!trading)
    {
      throw new NotFoundException(`Trading with id ${id} not found`);
    }

    return trading;
  }
}
