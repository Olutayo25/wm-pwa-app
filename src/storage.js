// src/storage.js
import { openDB } from 'idb';

const dbName = 'productionFormDB';
const storeName = 'formResponses';

const initDB = async () => {
  return openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

// Save data locally
export const saveDataLocally = async (data) => {
  const db = await initDB();
  await db.add(storeName, { ...data, synced: false });
};

// Get all submissions
export const getSubmissions = async () => {
  const db = await initDB();
  return db.getAll(storeName);
};

// Get a single submission by ID
export const getSubmission = async (id) => {
  const db = await initDB();
  return db.get(storeName, id);
};

// Update a submission
export const updateSubmission = async (id, data) => {
  const db = await initDB();
  await db.put(storeName, { id, ...data });
};

// Delete a submission
export const deleteSubmission = async (id) => {
  const db = await initDB();
  await db.delete(storeName, id);
};