import React from 'react';
import styles from './MypageEstateCard.module.css';
import { Link } from 'react-router-dom';
import Button01 from 'components/commons/button/Button01';

const MypageEstateCard = ({ type, rent, location, description, imageUrl }) => {
  return (
    <div className={styles.card}>
      <Link to={'#'}>
        <img src={imageUrl} alt={type} className={styles.cardImage} />
        <div className={styles.cardContent}>
          <p className={styles.type}>{type}</p>
          <h3 className={styles.rent}>{rent}</h3>
          <p className={styles.location}>{location}</p>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.contentWrapper}>
          <Button01 size="x-small" color="sub">
            상세보기
          </Button01>
          <br />
          <br />
          <Button01 size="x-small">삭제</Button01>
        </div>
      </Link>
    </div>
  );
};

export default MypageEstateCard;
