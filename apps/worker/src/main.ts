import 'dotenv/config'; // carrega o .env antes de qualquer coisa
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const { AppModule } = await import('./app.module.js');
  await NestFactory.createApplicationContext(AppModule);
}
await bootstrap();
