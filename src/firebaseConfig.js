import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

let app = null;
let auth = null;

export function initFirebase(config) {
  if (!config) throw new Error("Firebase config missing");

  // Давхар initialize болохоос хамгаалах
  if (!app) {
    app = initializeApp(config);
    auth = getAuth(app);
  }
  return { app, auth };
}