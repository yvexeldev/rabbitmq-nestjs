import { EnvModule } from '@app/env';
import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';

@Module({
  imports: [EnvModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
