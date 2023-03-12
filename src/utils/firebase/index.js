// Libraries
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { serverTimestamp as _serverTimestamp } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import {
  getDownloadURL,
  getStorage,
  ref as getStorageRef,
  uploadBytes,
} from 'firebase/storage';

// Helpers
import { fileToDataUrl } from '#utils/object';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
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

export const uploadImage = async (file, dataUrl) => {
  const fileName = file.name;
  const fileRef = getStorageRef('images/' + fileName);

  await uploadBytes(fileToDataUrl(dataUrl), { contentType: file.type });

  const url = await getDownloadURL(fileRef);

  return url;
};

export default db;
