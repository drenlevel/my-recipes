// Libraries
import { where } from 'firebase/firestore';

export const byOwnerId = id => (id ? where('ownerId', '==', id) : undefined);
