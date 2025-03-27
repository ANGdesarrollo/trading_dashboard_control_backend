import { Injectable, NotFoundException } from '@nestjs/common';

import { OperationDomain } from '../Domain/Entities/OperationDomain';
import { OperationRepository } from '../Infrastructure/OperationRepository';

@Injectable()
export class GetOperationByIdUseCase
{
  constructor(private readonly repository: OperationRepository) {}

  async execute(id: string): Promise<OperationDomain>
  {
    const trading = await this.repository.findOneBy('id', id);

    if (!trading)
    {
      throw new NotFoundException(`Trading with id ${id} not found`);
    }

    return trading;
  }
}
