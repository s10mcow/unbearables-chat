import firebase from 'firebase';
import FirebaseAuthenticationProvider from './firebase-auth';
import FirebaseDataProvider from './firebase-data';

const strings = {
  internalError: 'Internal Error ocurred, sorry',
  logoutFirst: 'You must logout first',
  // Login
  missingUsername: 'Please enter a username',
  missingPassword: 'A password is required to enter the den',
  invalidPassword: 'Invalid Password',
  incorrectPassword: 'Wrong password',
  // Signup
  missingInput: 'All fields are 100% required.',
  invalidUsername: 'Username cannot contain spaces',
  invalidEmail: 'That doesn\'t look like a real e-mail address.',
  bearExists: 'That bear name is already registered',
  emailTaken: 'This e-mail is in use by another account',
  passwordMissmatch: 'Passwords do not match',
  // Chat stuff
  youAreMuted: 'You\'ve been muted',
};

// This allows use of error.code as an index into the strings table
strings['PERMISSION_DENIED'] = strings.internalError;
strings['auth/email-already-in-use'] = strings.emailTaken;
strings['auth/wrong-password'] = strings.invalidPassword;
strings['auth/wrong-password'] = strings.incorrectPassword;

class FirebaseProviderClass {
  constructor() {
    this.configuration = {
      apiKey: 'AIzaSyAiv2QenojiDFADAprCNBNMHeQ7OmaTflA',
      authDomain: 'the-unbearables.firebaseapp.com',
      databaseURL: 'https://the-unbearables.firebaseio.com',
      projectId: 'the-unbearables',
      storageBucket: 'the-unbearables.appspot.com',
      messagingSenderId: '426775699540',
    };

    this.auth = new FirebaseAuthenticationProvider();
    this.data = new FirebaseDataProvider();
  }

  initialize = () => {
    firebase.initializeApp(this.configuration);
    this.data.initialize();
    return this.auth.initialize();
  };
}

const providerObj = new FirebaseProviderClass();

export default providerObj;
