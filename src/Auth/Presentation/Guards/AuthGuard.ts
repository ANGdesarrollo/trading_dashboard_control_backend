import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserToken } from '../../Domain/Entities/UserToken';

@Injectable()
export class AuthGuard implements CanActivate
{
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean>
  {
    const request = context.switchToHttp().getRequest();
    const cookies: string[] = request.headers.cookie.split(';');
    const token: string = cookies.find(cookie => cookie.trim().startsWith('auth_tokens='))?.split('=')[1];

    if (!token)
    {
      throw new UnauthorizedException();
    }

    const decoded: UserToken = await this.jwtService.verifyAsync(token);

    request.user = {
      username: decoded.username,
      id: decoded.id
    };

    return true;
  }
}
