import { Injectable, NotFoundException } from '@nestjs/common';

import { SymbolRepository } from '../Infrastructure/SymbolRepository';

@Injectable()
export class DeleteSymbolUseCase
{
  constructor(private readonly repository: SymbolRepository) {}

  async execute(id: string): Promise<void>
  {
    const symbol = await this.repository.findOneBy('id', id);

    if (!symbol)
    {
      throw new NotFoundException(`Symbol with id ${id} not found`);
    }

    await this.repository.delete(id);
  }
}
