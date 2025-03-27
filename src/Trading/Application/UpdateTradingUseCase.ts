import { Injectable, NotFoundException } from '@nestjs/common';

import { TradingDomain } from '../Domain/Entities/TradingDomain';
import { TradingRepository } from '../Infrastructure/TradingRepository';
import { UpdateTradingDto } from '../Presentation/Dtos/UpdateTradingDto';

@Injectable()
export class UpdateTradingUseCase
{
  constructor(private readonly repository: TradingRepository) {}

  async execute(id: string, payload: UpdateTradingDto): Promise<TradingDomain>
  {
    const trading = await this.repository.findOneBy('id', id);

    if (!trading)
    {
      throw new NotFoundException(`Trading with id ${id} not found`);
    }

    return this.repository.update(id, payload);
  }
}
