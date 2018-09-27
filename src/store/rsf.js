import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDP7Ff6_W84uy4O-4WpPBnBJLVXrQLYy_o',
  authDomain: 'the-unbearables-dev.firebaseapp.com',
  databaseURL: 'https://the-unbearables-dev.firebaseio.com',
  projectId: 'the-unbearables-dev',
  storageBucket: 'the-unbearables-dev.appspot.com',
  messagingSenderId: '311536213778',
});

const reduxSagaFirebase = new ReduxSagaFirebase(firebaseApp);

export default reduxSagaFirebase;
