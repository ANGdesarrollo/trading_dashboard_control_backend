import { Injectable } from '@nestjs/common';

import { SymbolDomain } from '../Domain/Entities/SymbolDomain';
import { SymbolRepository } from '../Infrastructure/SymbolRepository';
import { SymbolDto } from '../Presentation/Dtos/SymbolDto';

@Injectable()
export class CreateSymbolUseCase {
  constructor(private readonly repository: SymbolRepository) {}

  async execute(payload: SymbolDto): Promise<SymbolDomain> {
    return this.repository.create(payload);
  }
}
