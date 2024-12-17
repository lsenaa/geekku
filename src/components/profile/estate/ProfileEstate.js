import React, { useState, useEffect } from 'react';
import styles from './ProfileEstate.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ProfileEstate = () => {
  const { companyId } = useParams();
  const [profile, setProfile] = useState(null); // 중개업자 프로필 정보
  const [estateList, setEstateList] = useState([]); // 매물 등록 내역

  // 데이터 가져오기
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // 중개업자 프로필 정보 가져오기
        const profileResponse = await axios.get(
          `http://localhost:8080/estateProfile/${companyId}`
        );
        setProfile(profileResponse.data);

        // 매물 등록 내역 가져오기
        const estateResponse = await axios.get(
          `http://localhost:8080/estateCommunities/${companyId}`
        );
        setEstateList(estateResponse.data);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchProfileData();
  }, [companyId]);

  if (!profile) {
    return <div>로딩 중...</div>; // 프로필 로딩 중
  }

  return (
    <div className={styles.container}>
      {/* 사용자 정보 카드 */}
      <div className={styles.profile}>
        <FaUserCircle color="#6D885D" size={100} />
        <h4>{profile.name || '홍길동'}</h4>
        <p>{profile.username || 'kosta123'}</p>
        <p>{profile.email || 'kosta@gmail.com'}</p>
        <hr />
        <ul className={styles.sidebar}>
          <p className={styles.sectionTitle}>집꾸하기</p>
        </ul>
      </div>

      <div className={styles.contentWrap}>
        <div className={styles.subNav}>
          <p className={styles.active}>매물 등록 내역</p>
        </div>

        {/* 매물 등록내역 리스트 */}
        <ul className={styles.estateListWrap}>
          {estateList.map((estate, i) => (
            <li key={i} className={styles.estateItem}>
              <Link to="#">
                <div className={styles.imgWrapper}>
                  <img
                    src={
                      estate.imageList.length > 0
                        ? `http://localhost:8080/estateImages/${estate.imageList[0]}`
                        : '/assets/images/default-estate.png'
                    }
                    alt="매물 이미지"
                  />
                </div>
                <div className={styles.textWrapper}>
                  <p className={styles.type}>{estate.type}</p>
                  <p className={styles.price}>
                    월세 {estate.monthlyPrice}/{estate.depositPrice}
                  </p>
                  <div className={styles.locSizeWrapper}>
                    <p>
                      {estate.address1} {estate.address2}
                    </p>
                    <p>
                      {estate.size1}㎡ ({estate.size2}평)
                    </p>
                  </div>
                  <p className={styles.title}>{estate.title}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileEstate;
