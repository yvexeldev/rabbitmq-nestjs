import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EnvModule } from '@app/env';

@Module({
  imports: [EnvModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
