import firebase from 'firebase';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyDiWNIjsFwn4vYhcejN3oP83Lk0kE5RO_0',
  authDomain: 'kosta-2424.firebaseapp.com',
  projectId: 'kosta-2424',
  storageBucket: 'kosta-2424.firebasestorage.app',
  messagingSenderId: '170496303887',
  appId: '1:170496303887:web:5621702e5367c0a9eed47a',
  measurementId: 'G-0VCE8T0Z3Y',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseMessaging = firebaseApp.messaging();

export async function registerServiceWorker() {
  await navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker 등록 성공:', registration);
    })
    .catch((error) => {
      console.log('Service Worker 등록 실패:', error);
    });
}

export function firebaseReqPermission(setFcmToken, setAlarm) {
  firebaseMessaging
    .requestPermission()
    .then(() => {
      return firebaseMessaging.getToken();
    })
    .then(function (token) {
      setFcmToken(token);
    })
    .catch(function (error) {
      console.log('FCM ERROR : ', error);
    });

  firebaseMessaging.onMessage((payload) => {
    console.log(payload);
    setAlarm({
      num: +payload.data.num,
      title: payload.data.title, //수정함 Notification -> data
      body: payload.data.body,
    });
  });
}
