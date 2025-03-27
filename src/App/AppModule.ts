import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../Auth/AuthModule';
import { SharedModule } from '../Shared/SharedModule';

import { AppController } from './Presentation/AppController';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SharedModule,
    AuthModule
  ],
  controllers: [AppController]
})
export class AppModule {}
