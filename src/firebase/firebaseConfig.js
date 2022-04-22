// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCBxMqfBKMy3byzjaeTTcBdc7TSkIzoVTY",
  authDomain: "react-crud-cs.firebaseapp.com",
  projectId: "react-crud-cs",
  storageBucket: "react-crud-cs.appspot.com",
  messagingSenderId: "691708503750",
  appId: "1:691708503750:web:44bd5203a6bbb99c2899c7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db }