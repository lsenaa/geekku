import React from 'react';
import CommunityListCard from './CommunityListCard';
import styles from './CommunityList.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { url } from 'lib/axios';

// import interiorImage from '../../../assets/images/InteriorExam.jpg';
// import personImage from '../../../assets/images/person.jpg';

const CommunityList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/communityList`);
        setPosts(response.data);
      } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.postList}>
      {posts.map((post, index) => (
        <CommunityListCard
          key={index}
          community_num={post.community_num}
          title={post.title}
          image={post.image}
          viewCount={post.viewCount}
          profile={post.profile}
          className={styles.postCard}
        />
      ))}
    </div>
  );
};

export default CommunityList;
