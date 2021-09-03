import firebase from 'firebase/app';
import 'firebase/database'

const firebaseConfig = {

    apiKey: "AIzaSyB5w4vkH3eyDbhLL1PlnyiCQTehSz4DlY8",
  
    authDomain: "login-81303.firebaseapp.com",
  
    projectId: "login-81303",
  
    storageBucket: "login-81303.appspot.com",
  
    messagingSenderId: "190559138801",
  
    appId: "1:190559138801:web:c60343d040b1e0ba4b8a50"
  
  };

var fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();