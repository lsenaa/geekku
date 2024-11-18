import React, { useState } from 'react';
import style from './ProfilePerson.module.css';
import userProfileImage from 'assets/images/person.jpg';
import ProfilePersonCardList from 'components/profile/person/ProfilePersonCardList';
import { Outlet } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProfilePerson = () => {
  // 카드 리스트 데이터
  const [houseCards, setHouseCards] = useState([
    {
      id: 1,
      likeCount: 535,
      title: '색감 맞춤 브랜드 총 집합! 럭셔리 컬러템 1',
    },
    {
      id: 2,
      likeCount: 535,
      title: '색감 맞춤 브랜드 총 집합! 럭셔리 컬러템 2',
    },
    {
      id: 3,
      likeCount: 535,
      title: '색감 맞춤 브랜드 총 집합! 럭셔리 컬러템 3',
    },
    {
      id: 4,
      likeCount: 535,
      title: '색감 맞춤 브랜드 총 집합! 럭셔리 컬러템 4',
    },
    {
      id: 5,
      likeCount: 535,
      title: '색감 맞춤 브랜드 총 집합! 럭셔리 컬러템 5',
    },
    {
      id: 6,
      likeCount: 535,
      title: '색감 맞춤 브랜드 총 집합! 럭셔리 컬러템 6',
    },
  ]);

  return (
    <div className={style.profilePage}>
      {/* 사용자 정보 카드 */}
      <div className={style.profile}>
        <FaUserCircle color="#6D885D" size={100} />
        <h4>홍길동</h4>
        <p>kosta123</p>
        <p>kosta@gmail.com</p>
        <hr />
        <ul className={style.sidebar}>
          <p className={style.sectionTitle}>집들이</p>
        </ul>
      </div>

      {/* 집들이 카드 리스트 */}
      <div className={style.houseListContainer}>
        <h2 className={style.houseListTitle}>집들이</h2>
        <div className={style.houseListHeader}>
          <a href="#" className={style.houseListViewAll}>
            전체 보기
          </a>
        </div>
        <ProfilePersonCardList houseCards={houseCards} />
      </div>
      <Outlet />
    </div>
  );
};

export default ProfilePerson;
