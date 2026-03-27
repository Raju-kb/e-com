import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "e-commerce-e0f29.firebaseapp.com",
  projectId: "e-commerce-e0f29",
  storageBucket: "e-commerce-e0f29.firebasestorage.app",
  messagingSenderId: "115665622712",
  appId: "1:115665622712:web:df55692e48241bd4f5864d",
  measurementId: "G-K6Y087SETP",
  apiKey: "AIzaSyB13yZyEHFMv5Z8tJ31-x5FOPjY6i1ifm0",
  authDomain: "e-commerce-e0f29.firebaseapp.com",
  projectId: "e-commerce-e0f29",
  storageBucket: "e-commerce-e0f29.firebasestorage.app",
  messagingSenderId: "115665622712",
  appId: "1:115665622712:web:df55692e48241bd4f5864d",
  measurementId: "G-K6Y087SETP"
  
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
