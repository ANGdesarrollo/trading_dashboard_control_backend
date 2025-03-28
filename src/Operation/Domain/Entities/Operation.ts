import { FileDomain } from '../../../File/Domain/Entities/FileDomain';
import { SymbolDomain } from '../../../Symbol/Domain/Entities/SymbolDomain';

import { Result, TradeType } from './OperationDomain';

export class Operation
{
  public id: string;
  public symbolId: string;
  public symbol?: SymbolDomain;
  public fileId: string;
  public file?: FileDomain;
  public type: TradeType;
  public pips: number;
  public result: Result;
  public description?: string;
  public date: Date;

  constructor(
    id: string,
    symbolId: string,
    fileId: string,
    type: TradeType,
    pips: number,
    result: Result,
    date: Date,
    description?: string,
    symbol?: SymbolDomain,
    file?: FileDomain
  )
  {
    this.id = id;
    this.symbolId = symbolId;
    this.symbol = symbol;
    this.fileId = fileId;
    this.file = file;
    this.type = type;
    this.pips = pips;
    this.result = result;
    this.description = description;
    this.date = date;
  }
}
