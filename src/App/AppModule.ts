import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../Auth/AuthModule';
import { FileModule } from '../File/FileModule';
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
    SymbolModule,
    FileModule
  ],
  controllers: [AppController]
})
export class AppModule {}
