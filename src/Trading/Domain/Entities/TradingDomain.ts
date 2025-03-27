import { BaseDomain } from '../../../Shared/Domain/Repositories/BaseDomain';

export enum TradeType {
  LONG = 'LONG',
  SHORT = 'SHORT'
}

export enum Result {
  WON = 'WON',
  LOST = 'LOST',
  BE = 'BE'
}

export interface TradingDomain extends BaseDomain {
  id: string;
  symbol: string;
  type: TradeType;
  pips: number;
  imagePath: string;
  result: Result;
  description?: string;
  date: Date;
}
