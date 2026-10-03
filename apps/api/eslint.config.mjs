import { defineConfig } from 'eslint/config';
import globals from 'globals';
import preset from '@miolo-e-mel/config/eslint-preset.mjs';

export default defineConfig([
  ...preset,
  {
    languageOptions: {
      // Variáveis globais do Node (process, Buffer...). As do Vitest (describe, it, expect) vêm de `globals: true` no vitest.config.ts.
      globals: { ...globals.node },
    },
  },
]);