import {
  doc,
  setDoc,
  collection,
  getFirestore,
  addDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../api/firebase';

export const createUserDocument = async (user) => {
  console.log('user', user);
  if (!user) return;

  await addDoc(collection(db, 'users', `users/${user.user.uid}`), {
    displayName: user.user.displayName,
    uid: user.user.uid,
  });

  //   const snapshot = onSnapshot(userRef);
  //   if (!snapshot) {
  //     const { displayName, uid } = additionalData;
  //     try {
  //       await addDoc(collection(userRef, uid, displayName));
  //     } catch (error) {
  //       console.log('Error inputting user', error);
  //     }
  //   }
};
