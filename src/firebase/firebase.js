import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// firebase accaunt mygame75484
const firebaseConfig = {
  apiKey: "AIzaSyAECKZKZJ6lxWJA-fRvD-XikJXWCTfinUk",
  authDomain: "instagram-1deb3.firebaseapp.com",
  databaseURL: "https://instagram-1deb3-default-rtdb.firebaseio.com",
  projectId: "instagram-1deb3",
  storageBucket: "instagram-1deb3.appspot.com",
  messagingSenderId: "20486136322",
  appId: "1:20486136322:web:b63bc007263a1947e6bd1b",
  measurementId: "G-FV9WX1X1BZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const firestore = getFirestore(app);
