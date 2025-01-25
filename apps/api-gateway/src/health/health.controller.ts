import { EnvService } from '@app/env';
import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  constructor(private env: EnvService) {}
  @Get('check')
  getHealthStatus() {
    return { status: 'ok', releaseTag: this.env.getCommitID() };
  }
}
