import { BaseRepository } from '../../Shared/Domain/Repositories/BaseRepository';
import { OperationDomain } from '../Domain/Entities/OperationDomain';
import { OperationDto } from '../Presentation/Dtos/OperationDto';

export abstract class OperationRepository extends BaseRepository<OperationDto, OperationDomain> {}
