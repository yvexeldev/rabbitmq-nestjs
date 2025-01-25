import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { queus } from '@app/queu-names';
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
        queue: queus.USER,
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  await app.listen();
  logger.log(`User service is listening on queue: ${queus.USER}`);
}
bootstrap();
