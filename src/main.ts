import fastifyCookie from '@fastify/cookie';
import fastifyMultipart from '@fastify/multipart';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';


import { AppModule } from './App/AppModule';

async function bootstrap()
{
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.setGlobalPrefix('api');

  const PORT = process.env.PORT ?? 8000;

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET
  });

  await app.register(fastifyMultipart, {
    limits: {
      fileSize: 10 * 1024 * 1024,
      files: 1
    }
  });

  await app.listen(PORT);

  Logger.log(`🚀 Server is running on port ${PORT}`);
}

void bootstrap();
