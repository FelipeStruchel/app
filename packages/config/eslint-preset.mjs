import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

// Pastas que o ESLint nunca deve analisar (código gerado ou de terceiros).
export const ignores = globalIgnores([
  '**/node_modules/**',
  '**/dist/**',
  '**/coverage/**',
  '**/.next/**',
  '**/next-env.d.ts',
]);

export const rules = {
  rules: {
    // Exige === e !== (o == faz conversão de tipo e esconde bugs).
    eqeqeq: ['error', 'always'],
    // Variável/parâmetro não usado é erro; prefixe com _ para dizer "de propósito" (ex.: _req).
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    // `any` desliga a checagem de tipos; avisa (warning) mas não quebra o lint.
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};

// Desliga as regras do ESLint que brigariam com a formatação do Prettier.
// Reexportado para os apps Next montarem a configuração própria (ver SUB-005).
export { prettier };

// Preset completo para apps Node/TypeScript sem framework próprio de lint (api, worker, pacotes).
export default defineConfig([
  ignores,
  js.configs.recommended, // regras recomendadas do ESLint para JavaScript
  tseslint.configs.recommended, // regras recomendadas para TypeScript
  rules,
  prettier, // sempre por último
]);
