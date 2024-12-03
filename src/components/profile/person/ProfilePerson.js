import React, { useState, useEffect } from 'react';
import style from './ProfilePerson.module.css';
import userProfileImage from 'assets/images/person.jpg';
import ProfilePersonCardList from 'components/profile/person/ProfilePersonCardList';
import { Outlet, useParams } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProfilePerson = () => {
  const { userId } = useParams(); // URL에서 userId 추출
  const [userInfo, setUserInfo] = useState({
    name: '',
    username: '',
    email: '',
  });
  const [houseCards, setHouseCards] = useState([]); // 게시글 데이터 상태

  useEffect(() => {
    // 사용자 정보 가져오기
    axios
      .get(`http://localhost:8080/personProfile/${userId}`)
      .then((response) => {
        setUserInfo(response.data); // 사용자 정보 설정
      })
      .catch((error) => {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error);
      });

    // 작성 게시글 가져오기
    axios
      .get(`http://localhost:8080/personCommunities/${userId}`)
      .then((response) => {
        setHouseCards(response.data); // 데이터 상태 설정
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });
  }, [userId]); // userId가 변경되면 재요청

  return (
    <div className={style.profilePage}>
      {/* 사용자 정보 카드 */}
      <div className={style.profile}>
        <FaUserCircle color="#6D885D" size={100} />
        <h4>{userInfo.name || '홍길동'}</h4>
        <p>{userInfo.username || 'kosta123'}</p>
        <p>{userInfo.email || 'kosta@gmail.com'}</p>
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
