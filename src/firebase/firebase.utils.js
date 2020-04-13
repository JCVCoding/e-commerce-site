import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAgdFy4sd2CQmLQHKLYS8uuONXbCyBIu9c",
  authDomain: "crwn-db-7e310.firebaseapp.com",
  databaseURL: "https://crwn-db-7e310.firebaseio.com",
  projectId: "crwn-db-7e310",
  storageBucket: "crwn-db-7e310.appspot.com",
  messagingSenderId: "743468751426",
  appId: "1:743468751426:web:5c61b180fccc47e0e36bdb",
  measurementId: "G-TXGFTQ8WBE",
};

export const createUserProfileDocument = async (userAuth, additonalData) => {
  if (!userAuth) {
    return;
  }
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...additonalData });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;