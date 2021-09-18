import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { CONTACTS_URL, CONTACT_URL } from "./apiRoutes";

const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

initializeApp(FIREBASE_CONFIG);

export const contactsDatabaseRef = ref(getDatabase(), CONTACTS_URL);
export const contactDatabaseRef = (id: string) =>
  ref(getDatabase(), CONTACT_URL(id));
