import type { Job } from 'bullmq';
import { HealthCheckProcessor } from './health-check.queue.js';

describe('HealthCheckProcessor', () => {
  it('processa o job sem lançar erro', async () => {
    // 1. Preparar: cria o processor direto e um job falso (só os campos que o código usa).
    // O `as Job<...>` diz ao TypeScript "confie, isto se comporta como um Job".
    const processor = new HealthCheckProcessor();
    const job = { id: '1', data: { message: 'oi' } } as Job<{ message: string }>;

    // 2 e 3. Executar e verificar: `process` é assíncrono, então usamos `await` com `resolves`.
    // Não existe Redis aqui: o teste não usa a fila, só o método do processor.
    await expect(processor.process(job)).resolves.toBeUndefined();
  });
});