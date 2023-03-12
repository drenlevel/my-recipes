// Libraries
import { doc, getDocs, setDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

// Helpers
import db from '.';

export const secureGetDocs = async refDoc => {
  try {
    const res = await getDocs(refDoc);

    return res.docs.map(doc => ({
      id: doc.id,
      path: doc?.ref?.path,
      ...doc.data(),
    }));
  } catch (error) {
    toast.error(
      `Something went wrong when fetching a document!]\n\nReason: ${error.message}`,
    );
    console.error(error);
  }
};

export const secureSetDoc = async (data, ...paths) => {
  try {
    await setDoc(doc(db, ...paths), data);
  } catch (error) {
    console.error(error);
  }
};
