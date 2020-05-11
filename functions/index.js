const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize firebase admin.
admin.initializeApp();

// On user account created.
exports.createUserProfile = functions.auth.user().onCreate((user) => {
  const { uid, email } = user.toJSON();

  return admin.firestore().collection('users').doc(uid).set({ uid, email });
});
