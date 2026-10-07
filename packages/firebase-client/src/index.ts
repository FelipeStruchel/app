import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, type User } from 'firebase/auth';

// Inicia o Firebase uma única vez (o Next pode executar este código mais de uma vez).
function getFirebaseApp() {
  if (getApps().length > 0) return getApp();
  return initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

export function getFirebaseAuth() {
  return getAuth(getFirebaseApp());
}

// Abre o popup do Google e devolve o usuário logado.
export async function signInWithGoogle(): Promise<User> {
  const resultado = await signInWithPopup(getFirebaseAuth(), new GoogleAuthProvider());
  return resultado.user;
}

export function signOutUser(): Promise<void> {
  return signOut(getFirebaseAuth());
}

// O ID token vai no header "Authorization: Bearer <token>" em toda chamada à api.
// O Firebase renova o token sozinho quando ele vence (dura 1 hora).
export async function getIdToken(): Promise<string | null> {
  const usuario = getFirebaseAuth().currentUser;
  return usuario ? usuario.getIdToken() : null;
}
