import {
  doc,
  setDoc,
  collection,
  getFirestore,
  addDoc,
} from 'firebase/firestore';
import { db } from '../api/firebase';

export async function createUser(user, { displayName, uid }) {
  const listCollectionRef = collection(db, uid);

  return await addDoc(listCollectionRef, {
    userId: uid,
  });
}
