import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyDMj45IV8LXuOArD2DgtwvfB841dzcn620",
  authDomain: "tn-futecx.firebaseapp.com",
  databaseURL: "https://tn-futecx-default-rtdb.firebaseio.com",
  projectId: "tn-futecx",
  storageBucket: "tn-futecx-files.appspot.com", // ✅ spelling fix
  messagingSenderId: "884450104101",
  appId: "1:884450104101:web:eae68a54cdee6078f300cc",
  measurementId: "G-TNYE4ZSD3C"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);