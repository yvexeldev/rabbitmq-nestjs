import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from '@app/env';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('GatewayMain');
  const env = app.get(EnvService);

  const PORT = env.VARIABLES.API_GATEWAY_PORT;
  await app.listen(PORT);
  logger.log(`App listening on PORT: ${PORT}`);
}
bootstrap();
