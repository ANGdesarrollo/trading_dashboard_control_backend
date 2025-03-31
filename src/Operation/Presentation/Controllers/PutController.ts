import { Body, Controller, HttpCode, HttpStatus, Param, ParseUUIDPipe, Put } from '@nestjs/common';

import { UpdateOperationUseCase } from '../../Application/UpdateOperationUseCase';
import { OperationDomain } from '../../Domain/Entities/OperationDomain';
import { UpdateOperationDto } from '../Dtos/UpdateOperationDto';

@Controller('operation')
export class PutController
{
  constructor(private readonly updateOperationUseCase: UpdateOperationUseCase) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateOperationDto
  ): Promise<OperationDomain>
  {
    return this.updateOperationUseCase.execute(id, body);
  }
}
