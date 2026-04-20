import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChUHc4B_gQ1mFWsHjHH3-5uJygS9GLUT4",
  authDomain: "tieng-anh-app.firebaseapp.com",
  projectId: "tieng-anh-app",
  storageBucket: "tieng-anh-app.firebasestorage.app",
  messagingSenderId: "24758471570",
  appId: "1:24758471570:web:2d31d6c2d0c76629578f4b"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);