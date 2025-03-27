// src/Storage/Presentation/Dtos/StorageDto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class StorageDto {
  @IsString()
  @IsNotEmpty()
  exampleField: string;

  // Add your DTO fields here with appropriate decorators
}
