import { Controller, Delete, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';

import { DeleteStorageUseCase } from '../../Application/DeleteStorageUseCase';

@Controller('storage')
export class DeleteController {
  constructor(private readonly deleteStorageUseCase: DeleteStorageUseCase) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.deleteStorageUseCase.execute(id);
  }
}
