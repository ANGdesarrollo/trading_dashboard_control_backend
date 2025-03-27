import { Body, Controller, HttpCode, HttpStatus, Param, ParseUUIDPipe, Put } from '@nestjs/common';

import { UpdateSymbolUseCase } from '../../Application/UpdateSymbolUseCase';
import { SymbolDomain } from '../../Domain/Entities/SymbolDomain';
import { UpdateSymbolDto } from '../Dtos/UpdateSymbolDto';

@Controller('symbol')
export class PutController {
  constructor(private readonly updateSymbolUseCase: UpdateSymbolUseCase) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateSymbolDto
  ): Promise<SymbolDomain> {
    return this.updateSymbolUseCase.execute(id, body);
  }
}
