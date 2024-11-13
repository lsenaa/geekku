import React from 'react';
import styles from './MypageEstateCard.module.css';

const MypageEstateCard = ({ type, rent, location, description, imageUrl }) => {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={type} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <p className={styles.type}>{type}</p>
        <h3 className={styles.rent}>{rent}</h3>
        <p className={styles.location}>{location}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default MypageEstateCard;
