import { Body, Controller, HttpCode, HttpStatus, Param, ParseUUIDPipe, Put } from '@nestjs/common';

import { UpdateOperationUseCase } from '../../Application/UpdateOperationUseCase';
import { OperationDomain } from '../../Domain/Entities/OperationDomain';
import { UpdateOperationDto } from '../Dtos/UpdateOperationDto';

@Controller('trading')
export class PutController
{
  constructor(private readonly updateTradingUseCase: UpdateOperationUseCase) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateOperationDto
  ): Promise<OperationDomain>
{
    return this.updateTradingUseCase.execute(id, body);
  }
}
