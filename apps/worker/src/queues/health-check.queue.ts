import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import type { Job } from 'bullmq';

export const HEALTH_CHECK_QUEUE = 'health-check';

@Processor(HEALTH_CHECK_QUEUE)
export class HealthCheckProcessor extends WorkerHost {
  private readonly logger = new Logger(HealthCheckProcessor.name);

  // Chamado pelo BullMQ para cada job que chega na fila.
  async process(job: Job<{ message: string }>): Promise<void> {
    this.logger.log(`Job ${job.id} recebido: ${JSON.stringify(job.data)}`);
  }
}
