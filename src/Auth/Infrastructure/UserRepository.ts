import { BaseRepository } from '../../Shared/Domain/Repositories/BaseRepository';
import { UserDomain } from '../Domain/Entities/UserDomain';
import { RegisterUserDto } from '../Presentation/Dtos/RegisterUserDto';

export abstract class UserRepository extends BaseRepository<RegisterUserDto, UserDomain> {}
