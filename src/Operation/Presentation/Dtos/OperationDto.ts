import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from 'class-validator';

import { Result, TradeType } from '../../Domain/Entities/OperationDomain';

export class OperationDto
{
  @IsUUID()
  @IsNotEmpty()
    symbolId: string;

  @IsUUID()
  @IsNotEmpty()
    fileId: string; // Changed from imagePath to fileId

  @IsEnum(TradeType)
  @IsNotEmpty()
    type: TradeType;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
    pips: number;

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
