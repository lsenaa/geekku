import React, { useState } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io'; // IoMdNotificationsOutline 가져오기
import styles from './NotificationButton.module.css';

const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState([
    '알림 텍스트 메시지 1',
    '알림 텍스트 메시지 2',
    '알림 텍스트 메시지 3',
    '알림 텍스트 메시지 4',
    '알림 텍스트 메시지 5',
    '알림 텍스트 메시지 6',
    '알림 텍스트 메시지 7',
    '알림 텍스트 메시지 8',
    '알림 텍스트 메시지 9',
  ]);

  const toggleNotification = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.notificationContainer}>
      {/* 알림 버튼: IoMdNotificationsOutline로 교체 */}
      <button onClick={toggleNotification}>
        <IoMdNotificationsOutline size="24" color="#6D885D" /> {/* 아이콘 */}
      </button>

      {/* 알림 패널 */}
      <div
        className={`${styles.notificationPanel} ${
          isOpen ? styles.open : styles.close
        }`}
      >
        <div className={styles.notificationHeader}>
          <span>알림</span>
          <div className={styles.toggleSwitch}>
            <input type="checkbox" id="switch" />
            <label htmlFor="switch"></label>
          </div>
        </div>
        <ul className={styles.notificationList}>
          {notifications.map((notification, index) => (
            <li key={index} className={styles.notificationItem}>
              <span className={styles.notificationDot}>•</span> {notification}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationButton;
