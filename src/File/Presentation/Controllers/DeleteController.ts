import { Controller, Delete, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';

import { DeleteFileUseCase } from '../../Application/DeleteFileUseCase';

@Controller('storage')
export class DeleteController {
  constructor(private readonly deleteStorageUseCase: DeleteFileUseCase) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.deleteStorageUseCase.execute(id);
  }
}
