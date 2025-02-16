'use client'

import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, query, where, Firestore } from "firebase/firestore";
import { getAuth, Auth, onAuthStateChanged, GoogleAuthProvider, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

let app: FirebaseApp;
let analytics: Analytics;
let auth : Auth;
let db: Firestore;
let googleProvider: GoogleAuthProvider;

if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
}

const getUserData = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("__name__", "==", user.uid));

        try {
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            resolve(userData);
          } else {
            resolve(null);
          }
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(null);
      }
    });
  });
};

const logout = async () => {
  await signOut(auth);
};

export { app, analytics, auth, db, getUserData, googleProvider,logout };