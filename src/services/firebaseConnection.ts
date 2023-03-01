import firebase from "firebase/app";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyBmq-u3fh-cA7DiOBL641CkYQEyfzIDo5s",
  authDomain: "boardapp-4d939.firebaseapp.com",
  projectId: "boardapp-4d939",
  storageBucket: "boardapp-4d939.appspot.com",
  messagingSenderId: "669865643344",
  appId: "1:669865643344:web:df6de6edde1a73c85f7055",
  measurementId: "G-SV7T7YNKP2"
};

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;