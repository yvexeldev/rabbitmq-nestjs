import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:email')
  async getUser(@Param('email') email: string) {
    return await this.userService.getUser(email);
  }

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }
}
