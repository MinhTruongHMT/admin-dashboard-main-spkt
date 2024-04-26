import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import firebase from 'firebase/app';

// const firebaseConfig = {
//     apiKey: "AIzaSyAAPF6heeaw8y4Fw6nplkGNfAjhx-j7lv0",
//     authDomain: "filebase-5c23f.firebaseapp.com",
//     projectId: "filebase-5c23f",
//     databaseURL:"https://filebase-5c23f-default-rtdb.asia-southeast1.firebasedatabase.app/",
//     storageBucket: "filebase-5c23f.appspot.com",
//     messagingSenderId: "528674987131",
//     appId: "1:528674987131:web:5d212ea415cfd9b88296de",
//     measurementId: "G-8M2J7RS74W"
// };

const firebaseConfig = {
    apiKey: "AIzaSyDv04QJWv74N1p7y0IbVxatm_wge-LMvRQ",
    authDomain: "projectdata1-9faf7.firebaseapp.com",
    databaseURL: "https://projectdata1-9faf7-default-rtdb.firebaseio.com",
    projectId: "projectdata1-9faf7",
    storageBucket: "projectdata1-9faf7.appspot.com",
    messagingSenderId: "528818386478",
    appId: "1:528818386478:web:0176bbe7a2d996546111bf",
    measurementId: "G-KMF063XS2Q"
  };


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database }