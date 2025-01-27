import { Controller, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('get_user')
  async getUser(@Payload() payload: { email: string }) {
    return this.userService.getUser(payload.email);
  }

  @MessagePattern('get_users')
  async getUsers() {
    return this.userService.getUsers();
  }
}
