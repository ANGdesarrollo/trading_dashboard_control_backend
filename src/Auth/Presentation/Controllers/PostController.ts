import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { LoginUserUseCase } from '../../Application/LoginUserUseCase';
import { RegisterUserUseCase } from '../../Application/RegisterUserUseCase';
import { LoginUserDto } from '../Dtos/LoginUserDto';
import { RegisterUserDto } from '../Dtos/RegisterUserDto';

@Controller('auth')
export class PostController
{
  constructor(private readonly registerUserUseCase: RegisterUserUseCase, private readonly loginUserUseCase: LoginUserUseCase) {}

  @Post('login')
  async login(@Body() body: LoginUserDto, @Res() res: FastifyReply): Promise<void>
  {
    const token = await this.loginUserUseCase.execute(body);

    void res.setCookie('auth_tokens', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 30
    });

    res.status(200).send();
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() body: RegisterUserDto): Promise<void>
  {
    return this.registerUserUseCase.execute(body);
  }
}
