import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

export const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForLocalDevelopment123456789",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "localhost",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "smart-traffic-demo",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "smart-traffic-demo.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef123456",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-MEASUREMENT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);

// Connect to emulators if in development mode (optional - will use live Firebase if emulators not running)
if (location.hostname === "localhost") {
    try {
        connectFirestoreEmulator(db, 'localhost', 8080);
        console.log('Connected to Firestore emulator');
    } catch (e) {
        console.log('Firestore emulator not available, using live Firebase');
    }

    try {
        connectAuthEmulator(auth, "http://localhost:9099");
        console.log('Connected to Auth emulator');
    } catch (e) {
        console.log('Auth emulator not available, using live Firebase');
    }

    try {
        connectFunctionsEmulator(functions, "localhost", 5001);
        console.log('Connected to Functions emulator');
    } catch (e) {
        console.log('Functions emulator not available, using live Firebase');
    }
}

export { app, db, auth, functions };
