import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { CreateSymbolUseCase } from '../../Application/CreateSymbolUseCase';
import { SymbolDomain } from '../../Domain/Entities/SymbolDomain';
import { SymbolDto } from '../Dtos/SymbolDto';

@Controller('symbol')
export class PostController {
  constructor(private readonly createSymbolUseCase: CreateSymbolUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: SymbolDto): Promise<SymbolDomain> {
    return this.createSymbolUseCase.execute(body);
  }
}
