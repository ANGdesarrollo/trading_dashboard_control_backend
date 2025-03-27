import { Injectable } from '@nestjs/common';

import { OperationDomain } from '../Domain/Entities/OperationDomain';
import { OperationRepository } from '../Infrastructure/OperationRepository';

@Injectable()
export class ListOperationUseCase
{
  constructor(private readonly repository: OperationRepository) {}

  async execute(): Promise<OperationDomain[]>
  {
    return this.repository.list();
  }
}
