import React from 'react';
import CommunityFilterBar from './CommunityFilterBar';
import CommunityList from './CommunityList';
import styles from './CommunityMain.module.css';

function CommunityMain() {
  return (
    <div className={styles.app}>
      <CommunityFilterBar />
      <CommunityList />
    </div>
  );
}

export default CommunityMain;
