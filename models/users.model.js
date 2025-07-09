import { db } from '../config/firebase.js';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';
import bcrypt from 'bcrypt';

const collectionRef = collection(db, 'users');

export const getAll = async () => {
  const snapshot = await getDocs(collectionRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getById = async (id) => {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const getByUsername = async (username) => {
  const q = query(collectionRef, where('username', '==', username));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const userDoc = snapshot.docs[0];
  return { id: userDoc.id, ...userDoc.data() };
};

export const create = async ({ username, password }) => {
  const existing = await getByUsername(username);
  if (existing) {
    const error = new Error('El nombre de usuario ya está en uso');
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const docRef = await addDoc(collectionRef, {
    username,
    password: hashedPassword
  });

  return { id: docRef.id, username };
};

export const update = async (id, data) => {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    const error = new Error(`Usuario con ID ${id} no encontrado`);
    error.statusCode = 404;
    throw error;
  }

  const payload = { ...data };
  if (data.password) {
    payload.password = await bcrypt.hash(data.password, 10);
  }

  await updateDoc(docRef, payload);
  return { message: `Usuario con ID ${id} actualizado correctamente.` };
};

export const remove = async (id) => {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    const error = new Error(`Usuario con ID ${id} no encontrado`);
    error.statusCode = 404;
    throw error;
  }

  await deleteDoc(docRef);
  return { message: `Usuario con ID ${id} eliminado correctamente.` };
};
