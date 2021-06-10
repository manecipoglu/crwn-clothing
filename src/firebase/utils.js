import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_gsDqeNI28EKVbnre7zc9y12qYkw6uKM",
  authDomain: "crwn-clothing-15ca1.firebaseapp.com",
  projectId: "crwn-clothing-15ca1",
  storageBucket: "crwn-clothing-15ca1.appspot.com",
  messagingSenderId: "302018779170",
  appId: "1:302018779170:web:7d36c452b1fec063d8527b",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
