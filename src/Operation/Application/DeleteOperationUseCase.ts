import { Injectable, NotFoundException } from '@nestjs/common';

import { OperationRepository } from '../Infrastructure/OperationRepository';

@Injectable()
export class DeleteOperationUseCase
{
  constructor(private readonly repository: OperationRepository) {}

  async execute(id: string): Promise<void>
  {
    const operation = await this.repository.findOneBy('id', id);

    if (!operation)
    {
      throw new NotFoundException(`Operation with id ${id} not found`);
    }

    await this.repository.delete(id);
  }
}
