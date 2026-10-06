import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { Redis } from 'ioredis';
import { HEALTH_CHECK_QUEUE, HealthCheckProcessor } from './queues/health-check.queue.js';

// Cliente Redis criado por nós (exigência do BullMQ em ESM).
// `maxRetriesPerRequest: null` é obrigatório para workers do BullMQ.
const connection = new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

@Module({
  imports: [
    BullModule.forRoot({ connection }), // conexão compartilhada por todas as filas
    BullModule.registerQueue({ name: HEALTH_CHECK_QUEUE }), // a fila de exemplo
  ],
  providers: [HealthCheckProcessor], // quem processa os jobs da fila
})
export class AppModule {}
