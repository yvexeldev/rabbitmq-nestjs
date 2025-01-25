import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as chp from 'child_process';
import { EnvVariables } from './env.validation';

@Injectable()
export class EnvService {
  public VARIABLES: EnvVariables;
  constructor(private readonly config: ConfigService) {
    this.VARIABLES = {
      RABBITMQ_URL: this.config.get('RABBITMQ_URL'),
      API_GATEWAY_PORT: this.config.get('API_GATEWAY_PORT'),
    };
  }

  getCommitID(): string {
    const result = chp.execSync('git rev-parse --short HEAD').toString().trim();
    return result;
  }
}
