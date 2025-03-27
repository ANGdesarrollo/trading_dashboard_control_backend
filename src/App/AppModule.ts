import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../Auth/AuthModule';
import { SharedModule } from '../Shared/SharedModule';

import { AppController } from './Presentation/AppController';
import { TradingModule } from '../Trading/TradingModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SharedModule,
    AuthModule,
    TradingModule
  ],
  controllers: [AppController]
})
export class AppModule {}
