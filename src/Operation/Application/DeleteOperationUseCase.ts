import { Injectable, NotFoundException } from '@nestjs/common';

import { OperationRepository } from '../Infrastructure/OperationRepository';

@Injectable()
export class DeleteOperationUseCase
{
  constructor(private readonly repository: OperationRepository) {}

  async execute(id: string): Promise<void>
  {
    const trading = await this.repository.findOneBy('id', id);

    if (!trading)
    {
      throw new NotFoundException(`Trading with id ${id} not found`);
    }

    await this.repository.delete(id);
  }
}
