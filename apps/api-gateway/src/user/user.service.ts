import { Services } from '@app/service-names';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @Inject(Services.UserService) private readonly userClient: ClientProxy,
  ) {}

  getUser() {
    return this.userClient.send('get_hello', {});
  }
}
