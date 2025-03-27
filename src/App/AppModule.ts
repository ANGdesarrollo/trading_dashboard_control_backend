import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../Auth/AuthModule';
import { SharedModule } from '../Shared/SharedModule';

import { AppController } from './Presentation/AppController';
import { OperationModule } from '../Operation/OperationModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SharedModule,
    AuthModule,
    OperationModule
  ],
  controllers: [AppController]
})
export class AppModule {}
