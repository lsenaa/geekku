import styles from './ProfileInteriorSidebar.module.scss';
import profileImg from 'assets/images/interiorProfileImg.png';
import bookmarkOff from '../../../assets/images/bookmarkFalse.png';
import bookmarkOn from '../../../assets/images/bookmarkTrue.png';
import Button01 from 'components/commons/button/Button01';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { tokenAtom, userAtom } from 'store/atoms';

const ProfileInteriorSidebar = ({ detailInfo, bookmarkClick, bookmark }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/interiorRequest');
  };

  return (
    <div className={styles.profile}>
      <div className={styles.nameWrap}>
        <p>{detailInfo.interiorDetail.companyName}</p>
        <img
          src={bookmark === true ? bookmarkOn : bookmarkOff}
          alt="북마크 이미지"
          onClick={bookmarkClick}
        />
      </div>
      <hr className={styles.line} />
      <div className={styles.profileDetail}>
        <p>시공 사례 {detailInfo.sampleCount}건</p>
        <p>사용자 리뷰 {detailInfo.reviewCount}건</p>
        <p>{detailInfo.interiorDetail.intro}</p>
      </div>
      <Button01 size="x-small" onClick={handleClick}>
        문의하기
      </Button01>
    </div>
  );
};

export default ProfileInteriorSidebar;
