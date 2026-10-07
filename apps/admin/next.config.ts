import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Gera .next/standalone: uma pasta autocontida com só o necessário para rodar em produção (usada no Docker).
  output: 'standalone',
  // Raiz do monorepo: o Next precisa enxergar também ../../packages para incluí-los no standalone.
  outputFileTracingRoot: path.join(import.meta.dirname, '../../'),
  // Pacotes do monorepo que o Next deve compilar (estão em TypeScript, sem build próprio).
  transpilePackages: ['@miolo-e-mel/ui'],
};

export default nextConfig;
