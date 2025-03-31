import { Injectable, NotFoundException } from '@nestjs/common';

import { OperationDomain } from '../Domain/Entities/OperationDomain';
import { OperationRepository } from '../Infrastructure/OperationRepository';
import { UpdateOperationDto } from '../Presentation/Dtos/UpdateOperationDto';

@Injectable()
export class UpdateOperationUseCase
{
  constructor(private readonly repository: OperationRepository) {}

  async execute(id: string, payload: UpdateOperationDto): Promise<OperationDomain>
  {
    const operation = await this.repository.findOneBy('id', id);

    if (!operation)
    {
      throw new NotFoundException(`Operation with id ${id} not found`);
    }

    return this.repository.update(id, payload);
  }
}
