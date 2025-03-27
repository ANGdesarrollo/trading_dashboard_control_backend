import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UserUseCases } from './Application';
import { HashService } from './Domain/Services/HashService';
import { UserRepository } from './Infrastructure/UserRepository';
import { UserRepositoryImpl } from './Infrastructure/UserRepositoryImpl';
import { GetController } from './Presentation/Controllers/GetController';
import { PostController } from './Presentation/Controllers/PostController';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async(configService: ConfigService) => ({
        global: true,
        signOptions: { expiresIn: '1d' },
        secret: configService.get('JWT_SECRET')
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [PostController, GetController],
  providers: [
    ...UserUseCases,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl
    },
    HashService
  ]
})
export class AuthModule {}
