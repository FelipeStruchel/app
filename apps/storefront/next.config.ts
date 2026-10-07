import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Pacotes do monorepo que o Next deve compilar (estão em TypeScript, sem build próprio).
  transpilePackages: ['@miolo-e-mel/ui', '@miolo-e-mel/firebase-client'],
};

export default nextConfig;
