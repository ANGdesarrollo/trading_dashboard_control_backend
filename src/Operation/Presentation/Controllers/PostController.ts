import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { CreateOperationUseCase } from '../../Application/CreateOperationUseCase';
import { OperationDomain } from '../../Domain/Entities/OperationDomain';
import { OperationDto } from '../Dtos/OperationDto';

@Controller('trading')
export class PostController
{
  constructor(private readonly createTradingUseCase: CreateOperationUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: OperationDto): Promise<OperationDomain>
  {
    return this.createTradingUseCase.execute(body);
  }
}
