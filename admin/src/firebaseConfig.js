// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkgmeqJrANNbcTCRt9_Es2NyJ1_eGOucc",
  authDomain: "lama-dev-project-8efc6.firebaseapp.com",
  projectId: "lama-dev-project-8efc6",
  storageBucket: "lama-dev-project-8efc6.appspot.com",
  messagingSenderId: "147277431984",
  appId: "1:147277431984:web:daa3621a57a7746c026775",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
