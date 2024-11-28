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
        console.log(response.data); // 전체 API 응답 확인
        console.log(response.data.content); // content 배열 확인
        setPosts(response.data.content); // 상태로 content 설정
      } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(posts); // 상태 업데이트 후 확인
  }, [posts]);

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
