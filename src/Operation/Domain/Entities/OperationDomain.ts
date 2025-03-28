import { FileDomain } from '../../../File/Domain/Entities/FileDomain';
import { BaseDomain } from '../../../Shared/Domain/Repositories/BaseDomain';
import { SymbolDomain } from '../../../Symbol/Domain/Entities/SymbolDomain';

export enum TradeType
{
  LONG = 'LONG',
  SHORT = 'SHORT'
}

export enum Result
{
  WON = 'WON',
  LOST = 'LOST',
  BE = 'BE'
}

export interface OperationDomain extends BaseDomain
{
  id: string;
  symbolId: string;
  symbol?: SymbolDomain;
  fileId: string;
  file?: FileDomain;
  type: TradeType;
  pips: number;
  result: Result;
  description?: string;
  date: Date;
}
