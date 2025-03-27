import { Result, TradeType } from './TradingDomain';

export class Trading
{
  public id: string;
  public symbol: string;
  public type: TradeType;
  public pips: number;
  public imagePath: string;
  public result: Result;
  public description?: string;
  public date: Date;

  constructor(
    id: string,
    symbol: string,
    type: TradeType,
    pips: number,
    imagePath: string,
    result: Result,
    date: Date,
    description?: string
  )
{
    this.id = id;
    this.symbol = symbol;
    this.type = type;
    this.pips = pips;
    this.imagePath = imagePath;
    this.result = result;
    this.description = description;
    this.date = date;
  }
}
