import React, { useState } from 'react';
import CommunityFilterBar from './CommunityFilterBar';
import CommunityList from './CommunityList';
import styles from './CommunityMain.module.css';

function CommunityMain() {
  const [communityList, setCommunityList] = useState([]);

  return (
    <div className={styles.app}>
      <CommunityFilterBar
        communityList={communityList}
        setCommunityList={setCommunityList}
      />
      <CommunityList
        communityList={communityList}
        setCommunityList={setCommunityList}
      />
    </div>
  );
}

export default CommunityMain;
