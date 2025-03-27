import { Global, Module } from '@nestjs/common';

import { PrismaService } from './Infrastructure/DatabaseService';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class SharedModule {}
