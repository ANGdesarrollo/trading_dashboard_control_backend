import { Injectable, NotFoundException } from '@nestjs/common';

import { SymbolDomain } from '../Domain/Entities/SymbolDomain';
import { SymbolRepository } from '../Infrastructure/SymbolRepository';
import { UpdateSymbolDto } from '../Presentation/Dtos/UpdateSymbolDto';

@Injectable()
export class UpdateSymbolUseCase
{
  constructor(private readonly repository: SymbolRepository) {}

  async execute(id: string, payload: UpdateSymbolDto): Promise<SymbolDomain>
  {
    const symbol = await this.repository.findOneBy('id', id);

    if (!symbol)
    {
      throw new NotFoundException(`Symbol with id ${id} not found`);
    }

    return this.repository.update(id, payload);
  }
}
