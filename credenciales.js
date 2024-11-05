import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDobJrVk6WRJuuk3a_ZzohZ-3xC8KfyCYk",
  authDomain: "scrum5m.firebaseapp.com",
  projectId: "scrum5m",
  storageBucket: "scrum5m.appspot.com",
  messagingSenderId: "489493889535",
  appId: "1:489493889535:web:824bf6f00d881a4e88e7ca",
  measurementId: "G-XFWQXWKM35"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };

