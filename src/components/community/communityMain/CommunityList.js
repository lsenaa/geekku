import React from 'react';
import CommunityListCard from './CommunityListCard';
import styles from './CommunityList.module.css';

import interiorImage from '../../../assets/images/InteriorExam.jpg';
import personImage from '../../../assets/images/person.jpg';

const CommunityList = () => {
  const posts = [
    { title: '신혼집 스타일로 꾸며진 신혼부부의 집', views: 1509, image: interiorImage, profile: personImage },
    { title: '디자인에 중점을 맞춰, 복층과 팬트리룸', views: 984, image: interiorImage, profile: personImage },
    { title: '아이와 함께할 집, 따스한 인테리어', views: 1029, image: interiorImage, profile: personImage },
    { title: '거실에 딱! 필요한 아이템', views: 1009, image: interiorImage, profile: personImage },
    { title: '세련된 싱글족의 가구 배치법', views: 1056, image: interiorImage, profile: personImage },
    { title: '심플한 리빙룸 아이디어', views: 1059, image: interiorImage, profile: personImage },
    { title: '깔끔한 화이트 인테리어', views: 1059, image: interiorImage, profile: personImage },
    { title: '세련된 인테리어 팁', views: 1050, image: interiorImage, profile: personImage },
    { title: '모던한 리빙룸 아이디어', views: 1069, image: interiorImage, profile: personImage },
  ];

  return (
    <div className={styles.postList}>
      {posts.map((post, index) => (
        <CommunityListCard
          key={index}
          title={post.title}
          image={post.image}
          views={post.views}
          profile={post.profile}
          className={styles.postCard} // Additional styling for each card
        />
      ))}
    </div>
  );
};

export default CommunityList;
