// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPR3y83gpBN9m0HYfMOga61ydhroOBoOU",
  authDomain: "hushh-app.firebaseapp.com",
  projectId: "hushh-app",
  storageBucket: "hushh-app.appspot.com",
  messagingSenderId: "678498089483",
  appId: "1:678498089483:web:4e8477694a7a79ee2ba50e",
  measurementId: "G-1D84T9V22Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);