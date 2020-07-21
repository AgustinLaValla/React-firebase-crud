import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from './config';


  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();