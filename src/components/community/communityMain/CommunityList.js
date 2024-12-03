import React from 'react';
import CommunityListCard from './CommunityListCard';
import styles from './CommunityList.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { url } from 'lib/axios';

// import interiorImage from '../../../assets/images/InteriorExam.jpg';
// import personImage from '../../../assets/images/person.jpg';

const CommunityList = ({ communityList, setCommunityList }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(posts); // 상태 업데이트 후 확인
  }, [posts]);

  return (
    <div className={styles.postList}>
      {communityList.map((post, index) => (
        <CommunityListCard
          key={index}
          communityNum={post.communityNum}
          title={post.title}
          image={post.coverImage}
          viewCount={post.viewCount}
          profile={post.username}
          className={styles.postCard}
        />
      ))}
    </div>
  );
};

export default CommunityList;
