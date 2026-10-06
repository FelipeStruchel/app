import { Button } from '@miolo-e-mel/ui/components/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Painel administrativo — Miolo e Mel</h1>
      <Button>Entrar</Button>
    </main>
  );
}