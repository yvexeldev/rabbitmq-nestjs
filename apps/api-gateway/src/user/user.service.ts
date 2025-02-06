import { Services } from '@app/service-names';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject(Services.USER) private readonly userClient: ClientProxy,
  ) {}

  async getUser(email: string) {
    return await firstValueFrom(this.userClient.send('get_user', { email }));
  }

  async getUsers() {
    return await firstValueFrom(this.userClient.send('get_users', {}));
  }
}
