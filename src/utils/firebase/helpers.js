// Libraries
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import {
  getDownloadURL,
  ref as getStorageRef,
  uploadBytes,
} from 'firebase/storage';
import { toast } from 'react-hot-toast';

// Helpers
import db, { storage } from '.';
import { snakeCase } from 'change-case';

export const reportCommonError = error => {
  toast.error('Something went wrong with the action!');
  toast.error(`Error:\n${error.message}`);
  console.error(error);
};

const secureFirestoreAction =
  ({ action, callback, prepare } = {}) =>
  async (...args) => {
    try {
      const preparedArgs = prepare?.(...args) ?? args;
      const res = await action?.(...preparedArgs);

      return callback?.(res) ?? (res || { success: true });
    } catch (error) {
      reportCommonError(error);

      return { error };
    }
  };

export const secureGetDoc = secureFirestoreAction({
  action: getDoc,
  prepare: (...paths) => doc(db, ...paths.filter(Boolean)),
  callback: ({ data }) => data(),
});

export const secureGetDocs = secureFirestoreAction({
  action: getDocs,
  callback: ({ docs }) => {
    return docs.map(x => ({
      id: x.id,
      ref: x.ref,
      path: x.ref?.path,
      ...x.data(),
    }));
  },
});

export const secureSetDoc = secureFirestoreAction({
  action: setDoc,
  prepare: (data, ...paths) => [
    doc(db, ...paths),
    { ...data, timeStamp: serverTimestamp() },
  ],
});

export const secureGetDownloadURL = secureFirestoreAction({
  action: getDownloadURL,
  prepare: path => [getStorageRef(storage, path)],
});

export const secureUploadBytes = secureFirestoreAction({
  action: uploadBytes,
  prepare: (file, filePath = '', options) => [
    getStorageRef(storage, filePath),
    file,
    options,
  ],
});

/**
 * Uploads an image to the Firebase Storage given the file.
 * @param {File} file Image file to upload. _Mandatory_
 * @return {Promise<string>} Returns a string, which is the path to access/download the
 * uploaded image if successful.
 */
export const uploadImage = (file, subPath = 'recipes', callback) => {
  const [ext, ...fileNameSegments] = file.name.split('.').reverse();
  const fileName = fileNameSegments.join('_');
  const filePath = `images/${subPath}/${snakeCase(fileName)}.${ext}`;

  secureUploadBytes(file, filePath, { contentType: file.type }).then(data =>
    callback?.(data),
  );

  return filePath;
};

export const secureUpdateDoc = secureFirestoreAction({
  action: updateDoc,
  prepare: (data, ...paths) => [
    collection(db, ...paths.filter(Boolean)),
    { ...data, timeStamp: serverTimestamp() },
  ],
});

export const secureAddDoc = secureFirestoreAction({
  action: addDoc,
  prepare: (data, ...paths) => [
    collection(db, ...paths.filter(Boolean)),
    { ...data, timeStamp: serverTimestamp() },
  ],
});

export const secureDeleteDoc = secureFirestoreAction({
  action: deleteDoc,
  prepare: (...paths) => [doc(db, ...paths.filter(Boolean))],
});

export const batchSet = (coll = [], category) => {
  const list = collection(db, category);
  const batch = writeBatch(db);

  // eslint-disable-next-line no-unused-vars
  coll.forEach(({ path, id, ...data }) => {
    const docRef = doc(list, id);
    batch.set(docRef, data);
  });

  return batch.commit();
};
