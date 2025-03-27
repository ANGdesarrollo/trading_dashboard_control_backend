// src/Operation/Presentation/Dtos/OperationDto.ts
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from 'class-validator';

import { Result, TradeType } from '../../Domain/Entities/OperationDomain';

export class OperationDto
{
  @IsUUID()
  @IsNotEmpty()
    symbolId: string; // Changed from symbol: string

  @IsEnum(TradeType)
  @IsNotEmpty()
    type: TradeType;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
    pips: number;

  @IsString()
  @IsNotEmpty()
    imagePath: string;

  @IsEnum(Result)
  @IsNotEmpty()
    result: Result;

  @IsString()
  @IsOptional()
    description?: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
    date: Date;
}
