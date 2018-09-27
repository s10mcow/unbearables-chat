import firebase from 'firebase';
import firebaseData from './firebase-data';

const dataProvider = new firebaseData();
const validateEmail = function(email) {
  // Ripped from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export default class FirebaseAuthenticationProvider {
  constructor() {
    this.auth = null;
    this.account = null;
  }

  initialize() {
    const me = this;
    this.auth = firebase.auth();
    this.account = this.auth.currentUser;
    return new Promise(function(resolve, reject) {
      return me.auth.onAuthStateChanged(
        function(result) {
          me.account = result;
          resolve(result);
        },
        function(error) {
          console.error('onAuthStateChanged error');
          console.warn(error);
          me.account = null;

          reject();
        }
      );
    });
  }

  login(username, password) {
    if (this.account) {
      return Promise.reject('logoutFirst');
    }
    let usernamePromise = Promise.resolve(username);
    if (!validateEmail(username)) {
      usernamePromise = new Promise(function(resolve, reject) {
        dataProvider
          .read('registry/bears/' + username.toLowerCase() + '/email')
          .then(function(result) {
            if (result.value == null) {
              reject('invalidPassword');
            } else {
              resolve(result.value);
            }
          })
          .catch(function(result) {
            reject(result.error.code);
          });
      });
    }

    const me = this;
    return new Promise(function(resolve, reject) {
      usernamePromise
        .then(function(username) {
          me.auth
            .signInWithEmailAndPassword(username, password)
            .then(function(user) {
              resolve(me);
            })
            .catch(function(error) {
              reject(error.code);
            });
        })
        .catch(function(result) {
          reject(result);
        });
    });
  }
  logout() {
    if (!this.account) return Promise.reject('logoutFirst');
    return this.auth.signOut();
  }
  signup(username, password, email) {
    if (this.account) return Promise.reject('logoutFirst');

    const me = this;

    return new Promise(function(resolve, reject) {
      dataProvider
        .read('registry/bears/' + username.toLowerCase())
        .then(function(result) {
          if (result.value != null) {
            reject('bearExists');
          } else return me.auth.createUserWithEmailAndPassword(email, password);
        })
        .then(function(user) {
          me.account = user;
          return user.updateProfile({
            displayName: username,
          });
        })
        .then(function(user) {
          const registryEntry = {};
          registryEntry['ids/' + me.account.uid] = {
            email: me.account.email,
            name: me.account.displayName,
          };
          registryEntry['bears/' + me.account.displayName.toLowerCase()] = {
            uid: me.account.uid,
            email: me.account.email,
            name: me.account.displayName,
          };
          return dataProvider.update('registry/', registryEntry);
        })
        .then(function(update) {
          resolve(me);
        })
        .catch(function(result) {
          reject(result.code);
        });
    });
  }
}
