import { PartialType } from '@nestjs/mapped-types';

import { TradingDto } from './TradingDto';


export class UpdateTradingDto extends PartialType(TradingDto) {}
