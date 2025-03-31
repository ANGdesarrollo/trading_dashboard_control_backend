import { Injectable, NotFoundException } from '@nestjs/common';

import { OperationDomain } from '../Domain/Entities/OperationDomain';
import { OperationRepository } from '../Infrastructure/OperationRepository';

@Injectable()
export class GetOperationByIdUseCase
{
  constructor(private readonly repository: OperationRepository) {}

  async execute(id: string): Promise<OperationDomain>
  {
    const operation = await this.repository.findOneBy('id', id);

    if (!operation)
    {
      throw new NotFoundException(`Operation with id ${id} not found`);
    }

    return operation;
  }
}
