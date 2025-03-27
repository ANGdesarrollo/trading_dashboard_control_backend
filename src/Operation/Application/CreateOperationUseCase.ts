import { Injectable } from '@nestjs/common';

import { OperationDomain } from '../Domain/Entities/OperationDomain';
import { OperationRepository } from '../Infrastructure/OperationRepository';
import { OperationDto } from '../Presentation/Dtos/OperationDto';


@Injectable()
export class CreateOperationUseCase
{
  constructor(private readonly repository: OperationRepository) {}

  async execute(payload: OperationDto): Promise<OperationDomain>
{
    return this.repository.create(payload);
  }
}
