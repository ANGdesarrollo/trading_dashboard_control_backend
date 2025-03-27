import { Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';

import { GetSymbolByIdUseCase } from '../../Application/GetSymbolByIdUseCase';
import { ListSymbolUseCase } from '../../Application/ListSymbolUseCase';
import { SymbolDomain } from '../../Domain/Entities/SymbolDomain';

@Controller('symbol')
export class GetController {
  constructor(
    private readonly listSymbolUseCase: ListSymbolUseCase,
    private readonly getSymbolByIdUseCase: GetSymbolByIdUseCase
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<SymbolDomain[]> {
    return this.listSymbolUseCase.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id', ParseUUIDPipe) id: string): Promise<SymbolDomain> {
    return this.getSymbolByIdUseCase.execute(id);
  }
}
