import { defineConfig } from 'eslint/config';
import globals from 'globals';
import preset from '@miolo-e-mel/config/eslint-preset.mjs';

export default defineConfig([
  ...preset,
  {
    languageOptions: {
      // Variáveis globais do navegador (window, document...).
      globals: { ...globals.browser },
    },
  },
]);