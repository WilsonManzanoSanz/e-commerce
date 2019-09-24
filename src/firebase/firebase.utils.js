import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { firebaseConfig } from './firebase.config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, photoURL, email, uid, phoneNumber } = userAuth;
        const createAt = new Date();
        try {
            await userRef.set({
                displayName, email, photoURL, uid, createAt, phoneNumber, ...additionalData
            });
        } catch(error) {
            console.error('error creating the user', error.message);
        }
    }
    return userRef;
}

export default firebase;