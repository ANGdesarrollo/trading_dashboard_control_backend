import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { HashService } from '../Domain/Services/HashService';
import { UserRepository } from '../Infrastructure/UserRepository';
import { LoginUserDto } from '../Presentation/Dtos/LoginUserDto';

@Injectable()
export class LoginUserUseCase
{
  constructor(
    private readonly repository: UserRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService
  ) {}

  async execute(payload: LoginUserDto): Promise<string>
  {
    const user = await this.repository.findOneBy('username', payload.username);

    const isValidPassword = await this.hashService.compare(payload.password, user.password);

    if (!isValidPassword)
    {
      throw new UnauthorizedException();
    }

    return await this.jwtService.signAsync({
      username: user.username,
      id: user.id
    });
  }
}
