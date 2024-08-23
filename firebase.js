import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyABJO67oaac3NNRzKSMln0FopZi5j1fcBU",
  authDomain: "fir-auth-d7b2c.firebaseapp.com",
  projectId: "fir-auth-d7b2c",
  storageBucket: "fir-auth-d7b2c",
  messagingSenderId: "642078176350",
  appId: "1:642078176350:web:7982a900f62265d48df0cf"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };
