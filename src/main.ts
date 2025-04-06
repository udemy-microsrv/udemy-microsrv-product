import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get<number>('app.port') ?? 3000;
  await app.listen(port);

  const logger = new Logger('bootstrap');
  logger.log(`Server is listening on port ${port}`);
}
bootstrap();
