// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth, GoogleAuthProvider } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA6zBfI1GaFu5Yfc7n2A41fQBPs3txK3Bo",
    authDomain: "quizfinity-614d5.firebaseapp.com",
    projectId: "quizfinity-614d5",
    storageBucket: "quizfinity-614d5.appspot.com",
    messagingSenderId: "606821217711",
    appId: "1:606821217711:web:af92d108b38ef0e69a6b5a",
    measurementId: "G-XMRTLDHEEH"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const FIREBASE_DB = getFirestore(FIREBASE_APP);

export const googleProvider = new GoogleAuthProvider()
