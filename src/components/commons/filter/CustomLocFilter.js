import React, { useState } from 'react';
import styles from './CustomLocFilter.module.scss';
// import { imgUrl } from "../../../constants/path";
import loc_all from '../../../assets/images/loc_all.png';
import loc_gyunggy from '../../../assets/images/loc_gyunggy.png';
import loc_incheon from '../../../assets/images/loc_incheon.png';
import loc_chungcheong from '../../../assets/images/loc_chungcheong.png';
import loc_gangwon from '../../../assets/images/loc_gangwon.png';
import loc_jeolla from '../../../assets/images/loc_jeolla.png';
import loc_gyangsang from '../../../assets/images/loc_gyangsang.png';
import loc_jeju from '../../../assets/images/loc_jeju.png';

const CustomLocFilter = ({ selectedLoc, setSelectedLoc }) => {
  const categories = [
    { id: 1, name: '전체', imgSrc: loc_all },
    { id: 2, name: '경기', imgSrc: loc_gyunggy },
    { id: 3, name: '인천', imgSrc: loc_incheon },
    { id: 4, name: '충청', imgSrc: loc_chungcheong },
    { id: 5, name: '강원', imgSrc: loc_gangwon },
    { id: 6, name: '전라', imgSrc: loc_jeolla },
    { id: 7, name: '경상', imgSrc: loc_gyangsang },
    { id: 8, name: '제주', imgSrc: loc_jeju },
  ];

  const toggleLoc = (category) => {
    setSelectedLoc((prev) => {
      if (prev.includes(category.name)) {
        return prev.filter((name) => name !== category.name);
      } else {
        return [...prev, category.name];
      }
    });
    //console.log(`Filtering: ${category}`);
  };

  return (
    <div>
      <ul id={styles.filter}>
        {categories.map((category, index) => (
          <li
            id={styles.sub}
            key={index}
            onClick={() => toggleLoc(category)}
            className={`${styles.sub} ${selectedLoc.includes(category.name) ? styles.selected : ''}`}
          >
            <input
              type="checkbox"
              checked={selectedLoc.includes(category.name)}
              onChange={() => toggleLoc(category)}
              className={styles.checkbox}
              style={{ display: 'none' }}
            />
            <img src={category.imgSrc} alt={category.name} />
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomLocFilter;
