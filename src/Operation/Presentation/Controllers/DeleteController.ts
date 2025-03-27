import { Controller, Delete, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';

import { DeleteOperationUseCase } from '../../Application/DeleteOperationUseCase';

@Controller('trading')
export class DeleteController
{
  constructor(private readonly deleteTradingUseCase: DeleteOperationUseCase) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void>
  {
    return this.deleteTradingUseCase.execute(id);
  }
}
