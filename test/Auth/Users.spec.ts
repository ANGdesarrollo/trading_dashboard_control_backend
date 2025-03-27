import { faker } from '@faker-js/faker/locale/ar';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import TestAgent from 'supertest/lib/agent';

import { AuthModule } from '../../src/Auth/AuthModule';
import { LoginUserDto } from '../../src/Auth/Presentation/Dtos/LoginUserDto';
import { RegisterUserDto } from '../../src/Auth/Presentation/Dtos/RegisterUserDto';
import { getTestAgent } from '../TestAgent';

let agent: TestAgent;
let app: NestFastifyApplication;
let authCookies: string;
let userCredentials: RegisterUserDto;

describe('Auth E2E', () =>
{
  beforeAll(async() =>
  {
    const testAgent = await getTestAgent(AuthModule);
    agent = testAgent.agent;
    app = testAgent.app;
  });

  afterAll(async() =>
  {
    await app.close();
  });

  describe('Register', () =>
  {
    it('/POST /auth/register', async() =>
    {
      userCredentials = {
        username: faker.internet.username(),
        password: faker.internet.password()
      };

      const response = await agent.post('/api/auth/register').send(userCredentials);
      expect(response.status).toBe(201);
    });
  });

  describe('Login', () =>
  {
    it('/POST /auth/login', async() =>
    {
      const payload: LoginUserDto =
        {
        username: userCredentials.username,
        password: userCredentials.password
      };

      const response = await agent.post('/api/auth/login').send(payload);

      authCookies = response.headers['set-cookie'];

      expect(response.headers['set-cookie'][0]).toContain('auth_tokens');
      expect(response.status).toBe(200);
    });
  });

  describe('Me', () =>
  {
    it('/GET /auth/me', async() =>
    {
      const response = await agent
        .get('/api/auth/me')
        .set('Cookie', authCookies);

      expect(response.status).toBe(200);
      expect(response.body.username).toEqual(userCredentials.username);
    });
  });
});
