import firebase from 'firebase';

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyCAeyEot68-Dr7DmRl5ggZpuIvnlx9lCzk',
  authDomain: 'instagram-clone-66780.firebaseapp.com',
  projectId: 'instagram-clone-66780',
  storageBucket: 'instagram-clone-66780.appspot.com',
  appId: '1:1094916741839:web:7f95c10e302ec1ec59b5ba',
});

export const db = firebaseConfig.firestore();
export const auth = firebaseConfig.auth();
export const storage = firebaseConfig.storage();
