import 'dotenv/config'; // carrega o .env (precisa ser o primeiro import)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { initFirebase } from './auth/firebase.js';

async function bootstrap() {
  initFirebase();
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
