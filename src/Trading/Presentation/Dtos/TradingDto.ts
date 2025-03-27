// src/Trading/Presentation/Dtos/TradingDto.ts
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

import { Result, TradeType } from '../../Domain/Entities/TradingDomain';

export class TradingDto
{
  @IsString()
  @IsNotEmpty()
  symbol: string;

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
