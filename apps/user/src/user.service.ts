import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getHello() {
    return {
      id: 1,
      first_name: 'Azam',
      last_name: 'Abdusalomov',
    };
  }
}
