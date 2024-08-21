import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS
const serviceAccount = require(`../../${GOOGLE_APPLICATION_CREDENTIALS}`); // Substitua pelo caminho para sua chave privada

// Inicializa o Firebase Admin SDK apenas uma vez
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const auth = getAuth();

export { auth };