import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { Queues } from '@app/queu-names';
import { EnvService } from '@app/env';

async function bootstrap() {
  const logger = new Logger('UserModule');

  const appContext = await NestFactory.createApplicationContext(UserModule);
  const envService = appContext.get(EnvService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [envService.VARIABLES.RABBITMQ_URL],
        queue: Queues.USER,
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  await app.listen();
  logger.log(`User service is listening on queue: ${Queues.USER}`);
}
bootstrap();
