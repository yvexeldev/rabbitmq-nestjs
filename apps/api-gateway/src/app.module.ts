import { EnvModule } from '@app/env';
import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [EnvModule, HealthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
