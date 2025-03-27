// src/Symbol/Presentation/Dtos/SymbolDto.ts
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SymbolDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  name: string;
}
