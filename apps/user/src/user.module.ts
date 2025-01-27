import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EnvModule } from '@app/env';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [EnvModule, PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
