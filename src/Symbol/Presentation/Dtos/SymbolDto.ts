// src/Symbol/Presentation/Dtos/SymbolDto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class SymbolDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  // Add your DTO fields here with appropriate decorators
}
