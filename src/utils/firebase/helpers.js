// Libraries
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
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
import { fileToDataUrl } from '#utils/object';
import db, { storage } from '.';

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
  prepare: (data, ...paths) => [doc(db, ...paths), data],
});

export const secureGetDownloadURL = secureFirestoreAction({
  action: getDownloadURL,
  prepare: path => [getStorageRef(storage, path)],
});

export const secureUploadBytes = secureFirestoreAction({ action: uploadBytes });

/**
 * Uploads an image to the Firebase Storage given the file.
 * @param {File} file Image file to upload. _Mandatory_
 * @return {Promise<string>} Returns a string, which is the path to access/download the
 * uploaded image if successful.
 */
export const uploadImage = async file => {
  debugger;
  if (!(file instanceof File)) {
    toast.error(`Given file is not a File type!`);
    console.error(
      `Given file is not a File type but instead got ${typeof File}`,
    );

    return;
  }

  await secureUploadBytes(fileToDataUrl(file), { contentType: file.type });

  debugger;

  return secureGetDownloadURL(`images/${file.name}`);
};

export const secureUpdateDoc = secureFirestoreAction({
  action: updateDoc,
  prepare: (data, ...paths) => [
    doc(db, ...paths),
    { ...data, timeStamp: serverTimestamp() },
  ],
});

export const secureAddDoc = secureFirestoreAction({
  action: addDoc,
  prepare: (data, ...paths) => [
    collection(db, ...paths),
    { ...data, timeStamp: serverTimestamp() },
  ],
});

export const secureDeleteDoc = secureFirestoreAction({
  action: deleteDoc,
  prepare: (...paths) => [doc(db, ...paths)],
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
