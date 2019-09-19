import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBfX6trYD_1UCHK-5B_T8dL9a-Lg-aAC9Q",
    authDomain: "e-commerce-b0881.firebaseapp.com",
    databaseURL: "https://e-commerce-b0881.firebaseio.com",
    projectId: "e-commerce-b0881",
    storageBucket: "",
    messagingSenderId: "336594049178",
    appId: "1:336594049178:web:a4017c87681c828562e723"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;