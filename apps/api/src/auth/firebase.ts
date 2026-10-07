import { cert, getApps, initializeApp } from 'firebase-admin/app';

// Inicializa o Firebase Admin uma única vez (chamar de novo seria erro).
export function initFirebase(): void {
  if (getApps().length > 0) return;
  // A variável guarda o JSON da Service Account codificado em base64: decodifica e converte em objeto.
  const json = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_JSON ?? '', 'base64').toString(
    'utf-8',
  );
  initializeApp({ credential: cert(JSON.parse(json)) });
}
