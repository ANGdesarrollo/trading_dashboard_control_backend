import { Controller, Delete, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';

import { DeleteTradingUseCase } from '../../Application/DeleteTradingUseCase';

@Controller('trading')
export class DeleteController
{
  constructor(private readonly deleteTradingUseCase: DeleteTradingUseCase) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void>
  {
    return this.deleteTradingUseCase.execute(id);
  }
}
