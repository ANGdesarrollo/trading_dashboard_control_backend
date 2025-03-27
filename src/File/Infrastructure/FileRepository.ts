import { BaseRepository } from '../../Shared/Domain/Repositories/BaseRepository';
import { FileDomain } from '../Domain/Entities/FileDomain';
import { FileDto } from '../Presentation/Dtos/FileDto';

export abstract class FileRepository extends BaseRepository<FileDto, FileDomain> {}
