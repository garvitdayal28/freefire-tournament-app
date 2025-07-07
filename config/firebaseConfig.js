import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- Use Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDZ2WC6v6Yy61bzANIS5XimWzKEeirKhTY",
  authDomain: "shadow-arena-37.firebaseapp.com",
  projectId: "shadow-arena-37",
  storageBucket: "shadow-arena-37.appspot.com",
  messagingSenderId: "116421932663",
  appId: "1:116421932663:web:3846685a40bc5dd1353872",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app); // <-- Use Firestore

export { auth, db, app as default };
