import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database"; // Import the Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyABJO67oaac3NNRzKSMln0FopZi5j1fcBU",
  authDomain: "fir-auth-d7b2c.firebaseapp.com",
  projectId: "fir-auth-d7b2c",
  storageBucket: "fir-auth-d7b2c",
  messagingSenderId: "642078176350",
  appId: "1:642078176350:web:7982a900f62265d48df0cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Realtime Database
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const database = getDatabase(app); // Initialize the Realtime Database

export { auth, database }; // Export both auth and database
