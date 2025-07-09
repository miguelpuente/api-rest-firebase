import { db } from '../config/firebase.js';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

const collectionRef = collection(db, 'products');

export const getAll = async () => {
  const snapshot = await getDocs(collectionRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getById = async (id) => {
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const create = async (product) => {
  const docRef = await addDoc(collectionRef, product);
  return { id: docRef.id, ...product };
};

export const update = async (id, data) => {
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    const error = new Error(`Producto con ID ${id} no encontrado`);
    error.statusCode = 404;
    throw error;
  }
  await updateDoc(docRef, data);
  return { message: `Producto con ID ${id} actualizado correctamente.` };
};

export const remove = async (id) => {
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    const error = new Error(`Producto con ID ${id} no encontrado`);
    error.statusCode = 404;
    throw error;
  }
  await deleteDoc(docRef);
  return { message: `Producto con ID ${id} eliminado correctamente.` };
};
