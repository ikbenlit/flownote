import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, 
  connectFirestoreEmulator,
  enableMultiTabIndexedDbPersistence
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase with error handling
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase:", error);
  throw new Error("Failed to initialize Firebase. Check your configuration.");
}

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Enable multi-tab persistence for Firestore
// This is the recommended approach for most applications
// Note: This must be called before any other Firestore calls
(async () => {
  try {
    await enableMultiTabIndexedDbPersistence(db);
    console.log("Firestore multi-tab persistence enabled successfully");
  } catch (err: any) {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a time.
      console.warn("Firestore persistence could not be enabled because multiple tabs are open. Only one tab can initialize persistence at a time.");
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      console.warn("Firestore persistence is not available in this browser");
    } else {
      console.error("Error enabling Firestore persistence:", err);
    }
  }
})();
