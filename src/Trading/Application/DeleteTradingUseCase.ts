import { Injectable, NotFoundException } from '@nestjs/common';

import { TradingRepository } from '../Infrastructure/TradingRepository';

@Injectable()
export class DeleteTradingUseCase
{
  constructor(private readonly repository: TradingRepository) {}

  async execute(id: string): Promise<void>
  {
    const trading = await this.repository.findOneBy('id', id);

    if (!trading)
    {
      throw new NotFoundException(`Trading with id ${id} not found`);
    }

    await this.repository.delete(id);
  }
}
