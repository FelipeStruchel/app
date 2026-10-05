import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // react(): entende JSX/TSX. tsconfigPaths(): entende os aliases do tsconfig (@/ e @miolo-e-mel/ui/).
  plugins: [tsconfigPaths(), react()],
  test: {
    // Simula um navegador (document, window) dentro do Node para renderizar componentes.
    environment: 'jsdom',
    // describe, it e expect disponíveis sem import.
    globals: true,
    // Arquivo executado antes de cada arquivo de teste.
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8', // como a cobertura é medida
      // Mede todo o código de src/, inclusive arquivos que nenhum teste importa (aparecem com 0%).
      include: ['src/**/*.{ts,tsx}'],
      // Fora da conta: o layout raiz (só estrutura HTML/fontes) e os próprios testes.
      exclude: ['src/app/layout.tsx', 'src/**/*.spec.{ts,tsx}'],
      // Se qualquer índice ficar abaixo de 70%, `pnpm test:cov` falha (e o CI também).
      thresholds: { lines: 70, functions: 70, statements: 70 },
    },
  },
});