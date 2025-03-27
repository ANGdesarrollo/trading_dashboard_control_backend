import { Body, Controller, HttpCode, HttpStatus, Param, ParseUUIDPipe, Put } from '@nestjs/common';

import { UpdateFileUseCase } from '../../Application/UpdateFileUseCase';
import { FileDomain } from '../../Domain/Entities/FileDomain';
import { UpdateFileDto } from '../Dtos/UpdateFileDto';

@Controller('file')
export class PutController
{
  constructor(private readonly updateStorageUseCase: UpdateFileUseCase) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateFileDto
  ): Promise<FileDomain>
  {
    return this.updateStorageUseCase.execute(id, body);
  }
}
