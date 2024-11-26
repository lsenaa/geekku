// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDiWNIjsFwn4vYhcejN3oP83Lk0kE5RO_0",
  authDomain: "kosta-2424.firebaseapp.com",
  projectId: "kosta-2424",
  storageBucket: "kosta-2424.firebasestorage.app",
  messagingSenderId: "170496303887",
  appId: "1:170496303887:web:5621702e5367c0a9eed47a",
  measurementId: "G-0VCE8T0Z3Y",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  if (!(self.Notification && self.Notification.permission === 'granted')) 
    return;

  console.log('Background Message:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});