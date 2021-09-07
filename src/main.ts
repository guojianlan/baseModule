import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('127.0.0.1:30001');
  global.app = app;
  await app.listen(30001);
}
bootstrap();
