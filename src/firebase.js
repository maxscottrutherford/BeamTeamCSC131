// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpve5b4KUGzZmqFB4LOnkBaliJHAl6aNM",
  authDomain: "csc131beamteam.firebaseapp.com",
  projectId: "csc131beamteam",
  storageBucket: "csc131beamteam.appspot.com",
  messagingSenderId: "830170486870",
  appId: "1:830170486870:web:319cb6b575aa1148a0c3f7",
  measurementId: "G-6X9T8B30LN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;