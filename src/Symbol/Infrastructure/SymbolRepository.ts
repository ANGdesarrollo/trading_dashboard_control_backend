import { BaseRepository } from '../../Shared/Domain/Repositories/BaseRepository';
import { SymbolDomain } from '../Domain/Entities/SymbolDomain';
import { SymbolDto } from '../Presentation/Dtos/SymbolDto';

export abstract class SymbolRepository extends BaseRepository<SymbolDto, SymbolDomain> {}
