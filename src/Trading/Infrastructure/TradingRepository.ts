import { BaseRepository } from '../../Shared/Domain/Repositories/BaseRepository';
import { TradingDomain } from '../Domain/Entities/TradingDomain';
import { TradingDto } from '../Presentation/Dtos/TradingDto';

export abstract class TradingRepository extends BaseRepository<TradingDto, TradingDomain> {}
