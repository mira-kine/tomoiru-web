// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjG3kCPpDKMaU1sI7CAiQA3CVdQwab890",
  authDomain: "tomoiru-web.firebaseapp.com",
  projectId: "tomoiru-web",
  storageBucket: "tomoiru-web.appspot.com",
  messagingSenderId: "523400659278",
  appId: "1:523400659278:web:eaaac9327727c9b2401e1f",
  measurementId: "G-NGYH7GFTFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);