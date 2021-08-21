import Rebase from "re-base";
import firebase from "firebase/app";
require('firebase/database')

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBLzmcjSYEjgF2VdS3SRZ-dpMFfkHjkaak",
  authDomain: "very-hot-burgers-33f4e.firebaseapp.com",
  databaseURL: "https://very-hot-burgers-33f4e-default-rtdb.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp};

export default base;