import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Таны Firebase project config-г энд оруулна
const firebaseConfig = {
  apiKey: "AIzaSyCGroWVJfguuJE5bPVO5tTgVzCovBZrIMc",
  authDomain: "coach-14aee.firebaseapp.com",
  projectId: "coach-14aee",
  storageBucket: "coach-14aee.firebasestorage.app",
  messagingSenderId: "682145460799",
  appId: "1:682145460799:web:aa29016b56ac2719943e8a",
  measurementId: "G-ZS6LZW50G4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
