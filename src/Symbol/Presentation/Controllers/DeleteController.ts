import { Controller, Delete, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';

import { DeleteSymbolUseCase } from '../../Application/DeleteSymbolUseCase';

@Controller('symbol')
export class DeleteController {
  constructor(private readonly deleteSymbolUseCase: DeleteSymbolUseCase) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.deleteSymbolUseCase.execute(id);
  }
}
