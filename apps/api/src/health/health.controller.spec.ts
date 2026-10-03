import { HealthController } from './health.controller.js';

// `describe` agrupa os testes de uma unidade (aqui, o HealthController).
describe('HealthController', () => {
  // `it` é um teste: a frase descreve o comportamento esperado.
  it('retorna status ok', () => {
    // 1. Preparar: cria o controller direto, sem subir o Nest nem o servidor.
    const controller = new HealthController();

    // 2. Executar: chama o método que está sendo testado.
    const resultado = controller.check();

    // 3. Verificar: `expect` compara o resultado com o valor esperado.
    // `toEqual` compara o conteúdo do objeto (não precisa ser o mesmo objeto na memória).
    expect(resultado).toEqual({ status: 'ok' });
  });
});