// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaCxFC-LBPVfXCfyyof3LCgb_hMJ5j1rc",
  authDomain: "event-hive-client-side.firebaseapp.com",
  projectId: "event-hive-client-side",
  storageBucket: "event-hive-client-side.firebasestorage.app",
  messagingSenderId: "54438784518",
  appId: "1:54438784518:web:b8f9163c96377876495d87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export default auth;