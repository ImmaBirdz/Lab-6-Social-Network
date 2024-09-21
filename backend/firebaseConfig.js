// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD_DjRb2D8ufEz5x18bqJUnFgfqn4M_dE0",
    authDomain: "social-network-1f27d.firebaseapp.com",
    projectId: "social-network-1f27d",
    storageBucket: "social-network-1f27d.appspot.com",
    messagingSenderId: "489800493011",
    appId: "1:489800493011:web:ac922eef4204fc7792f126",
    measurementId: "G-D9T6WK3YS5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);