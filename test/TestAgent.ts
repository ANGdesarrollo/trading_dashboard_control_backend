import { ConfigModule } from '@nestjs/config';
import { ModuleDefinition } from '@nestjs/core/interfaces/module-definition.interface';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import TestAgent from 'supertest/lib/agent';

import { SharedModule } from '../src/Shared/SharedModule';
import fastifyCookie from '@fastify/cookie';

export type TestAgentType = { agent: TestAgent, app: NestFastifyApplication };

export const getTestAgent = async(
  ...modules: ModuleDefinition[]
): Promise<TestAgentType> =>
{
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      await ConfigModule.forRoot({
        isGlobal: true
      }),
      SharedModule,
      ...modules
    ]
  }).compile();

  const app = moduleFixture.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter()
  );

  app.setGlobalPrefix('api');

  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET
  });

  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  return {
    agent: request(app.getHttpServer()),
    app
  };
};
