"use client";

import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
  Firestore,
} from "firebase/firestore";
import {
  getAuth,
  Auth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp;
let analytics: Analytics;
let auth: Auth;
let db: Firestore;
let googleProvider: GoogleAuthProvider;

if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
}

// 🔥 Buscar todos os to-dos do usuário autenticado
const getUserTodos = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const todosRef = collection(db, "todos");
          const q = query(todosRef, where("userId", "==", user.uid)); // Filtra pelo usuário logado
          const querySnapshot = await getDocs(q);

          const todos = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          resolve(todos);
        } catch (error) {
          reject(error);
        }
      } else {
        resolve([]);
      }
    });
  });
};

// 🔥 Criar um novo to-do no Firestore
const addTodo = async (title: string, description: string) => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const todosRef = collection(db, "todos");
          const docRef = await addDoc(todosRef, {
            userId: user.uid,
            title,
            description,
          });

          resolve(docRef.id);
        } catch (error) {
          reject(error);
        }
      } else {
        reject("Usuário não autenticado.");
      }
    });
  });
};

// 🔥 Método para excluir um to-do pelo ID
const deleteTodo = async (todoId: string) => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const todoDoc = doc(db, "todos", todoId);
          await deleteDoc(todoDoc);
          resolve("To-do apagado com sucesso!");
        } catch (error) {
          reject(error);
        }
      } else {
        reject("Usuário não autenticado.");
      }
    });
  });
};

const logout = async () => {
  await signOut(auth);
};

export {
  app,
  analytics,
  auth,
  db,
  getUserTodos,
  addTodo,
  deleteTodo,
  googleProvider,
  logout,
};
