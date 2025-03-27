import { Result, TradeType } from './OperationDomain';

export class Operation
{
  public id: string;
  public symbolId: string;
  public symbol?: {
    id: string;
    name: string;
  };
  public type: TradeType;
  public pips: number;
  public imagePath: string;
  public result: Result;
  public description?: string;
  public date: Date;

  constructor(
    id: string,
    symbolId: string,
    type: TradeType,
    pips: number,
    imagePath: string,
    result: Result,
    date: Date,
    description?: string,
    symbol?: {
      id: string;
      name: string;
    }
  )
{
    this.id = id;
    this.symbolId = symbolId;
    this.symbol = symbol;
    this.type = type;
    this.pips = pips;
    this.imagePath = imagePath;
    this.result = result;
    this.description = description;
    this.date = date;
  }
}
