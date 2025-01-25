import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as chp from 'child_process';
@Injectable()
export class EnvService {
  constructor(private readonly config: ConfigService) {}

  getCommitID(): string {
    const result = chp.execSync('git rev-parse --short HEAD').toString().trim();
    return result;
  }

  get(key: string, defaultValue?: any) {
    if (defaultValue) return this.config.get(key, defaultValue);
    return this.config.get(key);
  }
}
