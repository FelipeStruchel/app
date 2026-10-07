'use client';

import { useState } from 'react';
import { getIdToken, signInWithGoogle, signOutUser } from '@miolo-e-mel/firebase-client';
import { Button } from '@miolo-e-mel/ui/components/button';

export default function LoginPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  // Recebe a função de login escolhida (Google) e cuida do resultado.
  async function entrar(login: typeof signInWithGoogle) {
    setErro(null);
    try {
      const usuario = await login();
      setEmail(usuario.email);
      // Só para testar a api: copie o token do console e use no header Authorization.
      console.log('ID token:', await getIdToken());
    } catch {
      setErro('Não foi possível entrar. Tente novamente.');
    }
  }

  async function sair() {
    await signOutUser();
    setEmail(null);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Entrar</h1>
      {email ? (
        <>
          <p>Logado como {email}</p>
          <Button onClick={sair}>Sair</Button>
        </>
      ) : (
        <>
          <Button onClick={() => entrar(signInWithGoogle)}>Entrar com Google</Button>
        </>
      )}
      {erro && <p role="alert">{erro}</p>}
    </main>
  );
}
