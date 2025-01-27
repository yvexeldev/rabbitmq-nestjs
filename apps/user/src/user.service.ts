import { RegisterUserDto } from '@app/dto';
import { PrismaService } from '@app/prisma';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  getHello() {
    return {
      id: 1,
      first_name: 'Azam',
      last_name: 'Abdusalomov',
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    // TODO: Register user logic
  }

  private async checkUser(email: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email,
          isActive: true,
        },
      });
      if (user) throw new BadRequestException('You have already registered!');
    } catch (error) {
      throw new InternalServerErrorException(JSON.stringify(error));
    }
  }
}
