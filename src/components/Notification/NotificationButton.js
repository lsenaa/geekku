import React, { useState } from 'react';
import './Notification.css';

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
    <div className="notification-container">
      <button className="notification-button" onClick={toggleNotification}>
        알림
      </button>
      <div className={`notification-panel ${isOpen ? 'open' : 'close'}`}>
        <div className="notification-header">
          <span>알림</span>
          <div className="toggle-switch">
            <input type="checkbox" id="switch" />
            <label htmlFor="switch"></label>
          </div>
        </div>
        <ul className="notification-list">
          {notifications.map((notification, index) => (
            <li key={index} className="notification-item">
              <span className="notification-dot">•</span> {notification}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationButton;
