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

export interface OperationDomain extends BaseDomain {
  id: string;
  symbolId: string;
  symbol?: {
    id: string;
    name: string;
  };
  type: TradeType;
  pips: number;
  imagePath: string;
  result: Result;
  description?: string;
  date: Date;
}
