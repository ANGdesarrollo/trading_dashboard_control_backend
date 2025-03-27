import { Controller, Get, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

import { UserToken } from '../../Domain/Entities/UserToken';
import { AuthGuard } from '../Guards/AuthGuard';

@Controller('auth')
export class GetController
{
  constructor() {}

  @UseGuards(AuthGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  me(@Req() request: FastifyRequest): Promise<UserToken>
  {
    return request['user'];
  }
}
