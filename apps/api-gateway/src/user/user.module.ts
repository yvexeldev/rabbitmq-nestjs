import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { Queues } from '@app/queu-names';
import { EnvService } from '@app/env';
import { Services } from '@app/service-names';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: Services.USER,
        useFactory: async (envService: EnvService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [envService.VARIABLES.RABBITMQ_URL],
            queue: Queues.USER,
            queueOptions: {
              durable: true,
            },
          },
        }),
        inject: [EnvService],
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
