import React from 'react';
import styles from './ProfilePersonCard.module.css';
import InteriorExam from 'assets/images/InteriorExam.jpg';
import bookmarkImg from 'assets/images/bookmarkTrue.png';

const ProfilePersonCard = ({ likeCount, title }) => {
  return (
    <div className={styles.houseCard}>
      <img src={InteriorExam} alt="House" className={styles.houseImage} />
      <div className={styles.houseDetails}>
        <p className={styles.houseTitle}>{title}</p>
        <div className={styles.likeSection}>
          <img src={bookmarkImg} alt="북마크 이미지" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePersonCard;
