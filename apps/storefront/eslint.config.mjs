import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import { ignores, rules, prettier } from '@miolo-e-mel/config/eslint-preset.mjs';

export default defineConfig([
  ...nextVitals, // regras do Next + React + performance (Core Web Vitals)
  ...nextTs, // regras de TypeScript do Next
  ignores, // pastas ignoradas, as do monorepo
  rules, // regras do projeto (eqeqeq, no-unused-vars, ...)
  prettier, // sempre por último
]);
