import { Injectable } from '@nestjs/common';

import { FileDomain } from '../Domain/Entities/FileDomain';
import { FileRepository } from '../Infrastructure/FileRepository';

@Injectable()
export class ListFileUseCase
{
  constructor(private readonly repository: FileRepository) {}

  async execute(): Promise<FileDomain[]>
  {
    return this.repository.list();
  }
}
