import { Injectable, NotFoundException } from '@nestjs/common';

import { SymbolDomain } from '../Domain/Entities/SymbolDomain';
import { SymbolRepository } from '../Infrastructure/SymbolRepository';

@Injectable()
export class GetSymbolByIdUseCase {
  constructor(private readonly repository: SymbolRepository) {}

  async execute(id: string): Promise<SymbolDomain> {
    const symbol = await this.repository.findOneBy('id', id);

    if (!symbol) {
      throw new NotFoundException(`Symbol with id ${id} not found`);
    }

    return symbol;
  }
}
