import { Controller, Delete, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';

import { DeleteOperationUseCase } from '../../Application/DeleteOperationUseCase';

@Controller('operation')
export class DeleteController
{
  constructor(private readonly deleteOperationUseCase: DeleteOperationUseCase) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void>
  {
    return this.deleteOperationUseCase.execute(id);
  }
}
