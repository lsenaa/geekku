import React from 'react';
import styles from './MypageEstateCard.module.css';
import Button01 from 'components/commons/button/Button01';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { axiosInToken, url } from 'lib/axios';
import useToken from 'antd/es/theme/useToken';
import { tokenAtom, userAtom } from 'store/atoms';
import { useAtomValue } from 'jotai';
const MypageEstateCard = ({
  estateNum,
  type,
  rent,
  location,
  description,
  imageUrl,
  onDelete, // 부모 컴포넌트에서 데이터를 삭제하기 위한 콜백 함수
}) => {
  const navigate = useNavigate();
  const token = useAtomValue(tokenAtom);

  // 삭제 처리 함수
  const handleDelete = async () => {
    if (window.confirm('정말로 이 항목을 삭제하시겠습니까?')) {
      try {
        await axiosInToken(token).delete(
          `${url}/company/deleteEstateList/${estateNum}`
        );
        alert('삭제되었습니다.');
        onDelete(estateNum); // 부모 컴포넌트에 삭제된 항목을 전달
      } catch (error) {
        console.error('삭제 중 오류 발생:', error);
        alert('삭제 중 문제가 발생했습니다.');
      }
    }
  };

  return (
    <div className={styles.card}>
      {/* 이미지 및 내용 */}
      <img src={imageUrl} alt={type} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <p className={styles.type}>{type}</p>
        <h3 className={styles.rent}>{rent}</h3>
        <p className={styles.location}>{location}</p>
        <p className={styles.description}>{description}</p>
      </div>

      {/* 버튼 영역 */}
      <div className={styles.contentWrapper}>
        <Button01
          size="x-small"
          color="sub"
          onClick={() => {
            console.log(estateNum);
            navigate(`/house/detail/${estateNum}`); // 상세보기 네비게이션
          }}
        >
          상세보기
        </Button01>
        <br />
        <br />
        <Button01 size="x-small" color="danger" onClick={handleDelete}>
          삭제
        </Button01>
      </div>
    </div>
  );
};

export default MypageEstateCard;
