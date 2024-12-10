import './App.css';
import Header from 'components/layout/header/Header';
import Footer from 'components/layout/footer/Footer';
import Router from 'routes/Router';
import React, { useEffect, useState } from 'react';
import {
  registerServiceWorker,
  firebaseReqPermission,
} from './store/firebaseconfig';
import { useSetAtom, useAtom } from 'jotai';
import { fcmTokenAtom, alarmsAtom } from './store/atoms';
import TopButton from 'components/layout/topbutton/TopButton';

function App() {
  const [alarm, setAlarm] = useState({});
  const setFcmToken = useSetAtom(fcmTokenAtom);
  const [alarms, setAlarms] = useAtom(alarmsAtom);

  const initializeFirebase = async () => {
    await registerServiceWorker();
    await navigator.serviceWorker.ready;
    await firebaseReqPermission(setFcmToken, setAlarm);
  };

  useEffect(() => {
    initializeFirebase();
  }, []);

  useEffect(() => {
    if (alarm !== null && JSON.stringify(alarm) !== '{}') {
      // 알람이 있을 경우에만 추가
      setAlarms((prevAlarms) => [...prevAlarms, alarm]);
    }
  }, [alarm]); // alarm 상태가 변경될 때마다 알림을 추가

  return (
    <div className="appContainer">
      <Header alarms={alarms} />
      <Router />
      <TopButton />
      <Footer />
    </div>
  );
}

export default App;
