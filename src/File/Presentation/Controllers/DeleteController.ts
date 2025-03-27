import { Controller, Delete, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';

import { DeleteFileUseCase } from '../../Application/DeleteFileUseCase';

@Controller('file')
export class DeleteController
{
  constructor(private readonly deleteFileUseCase: DeleteFileUseCase) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void>
  {
    return this.deleteFileUseCase.execute(id);
  }
}
