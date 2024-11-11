import React from 'react';
import styles from './PersonProfileCard.module.css';
import InteriorExam from '../../assets/images/InteriorExam.jpg';

const PersonProfileCard = ({ likeCount, title }) => {
  return (
    <div className={styles.houseCard}>
      <img src={InteriorExam} alt="House" className={styles.houseImage} />
      <div className={styles.houseDetails}>
        <div className={styles.likeSection}>
          <span className={styles.likeIcon}>🍀</span> {likeCount}
        </div>
        <p className={styles.houseTitle}>{title}</p>
      </div>
    </div>
  );
};

export default PersonProfileCard;
