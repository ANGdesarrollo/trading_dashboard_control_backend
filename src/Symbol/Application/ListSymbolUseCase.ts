import { Injectable } from '@nestjs/common';

import { SymbolDomain } from '../Domain/Entities/SymbolDomain';
import { SymbolRepository } from '../Infrastructure/SymbolRepository';

@Injectable()
export class ListSymbolUseCase
{
  constructor(private readonly repository: SymbolRepository) {}

  async execute(): Promise<SymbolDomain[]>
  {
    return this.repository.list();
  }
}
