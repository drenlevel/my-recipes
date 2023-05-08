// Libraries
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { serverTimestamp as _serverTimestamp } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY_2,
  appId: import.meta.env.VITE_FIREBASE_APP_ID_2,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_2,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID_2,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_2,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_2,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_2,
};

const app = (() => {
  // Initialize Firebase app only once!
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }
})();

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const serverTimestamp = _serverTimestamp();

export default db;
