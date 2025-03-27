import { Body, Controller, HttpCode, HttpStatus, Param, ParseUUIDPipe, Put } from '@nestjs/common';

import { UpdateStorageUseCase } from '../../Application/UpdateStorageUseCase';
import { StorageDomain } from '../../Domain/Entities/StorageDomain';
import { UpdateStorageDto } from '../Dtos/UpdateStorageDto';

@Controller('storage')
export class PutController {
  constructor(private readonly updateStorageUseCase: UpdateStorageUseCase) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateStorageDto
  ): Promise<StorageDomain> {
    return this.updateStorageUseCase.execute(id, body);
  }
}
