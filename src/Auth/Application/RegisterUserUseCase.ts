import { Injectable } from '@nestjs/common';

import { HashService } from '../Domain/Services/HashService';
import { UserRepository } from '../Infrastructure/UserRepository';
import { RegisterUserDto } from '../Presentation/Dtos/RegisterUserDto';

@Injectable()
export class RegisterUserUseCase
{
  constructor(private readonly repository: UserRepository, private readonly hashService: HashService) {}

  async execute(user: RegisterUserDto): Promise<void>
  {
    user.password = await this.hashService.hash(user.password);

    await this.repository.create(user);
  }
}
