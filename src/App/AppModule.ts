import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../Auth/AuthModule';
import { OperationModule } from '../Operation/OperationModule';
import { SharedModule } from '../Shared/SharedModule';
import { SymbolModule } from '../Symbol/SymbolModule';

import { AppController } from './Presentation/AppController';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SharedModule,
    AuthModule,
    OperationModule,
    SymbolModule
  ],
  controllers: [AppController]
})
export class AppModule {}
