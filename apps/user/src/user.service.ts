import { RegisterUserDto } from '@app/dto';
import { PrismaService } from '@app/prisma';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name + ' RMQ');
  constructor(private readonly prisma: PrismaService) {}

  async register(registerUserDto: RegisterUserDto) {
    await this.checkUser(registerUserDto.email);
    //TODO: register fully logic
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

  async getUser(email: string) {
    this.logger.log({ email }, 'Function start');
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        isActive: true,
      },
    });
    this.logger.log({ user }, 'Function end');

    return user;
  }

  async getUsers() {
    this.logger.log('Function start');
    const users = await this.prisma.user.findMany();
    this.logger.log({ users }, 'Function end');

    return users;
  }

  private hashPassword() {
    //TODO: hashing password
  }
}
