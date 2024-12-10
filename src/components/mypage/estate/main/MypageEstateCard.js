import React from 'react';
import styles from './MypageEstateCard.module.css';
import Button01 from 'components/commons/button/Button01';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { axiosInToken, url } from 'lib/axios';
import useToken from 'antd/es/theme/useToken';
import { tokenAtom, userAtom } from 'store/atoms';
import { useAtomValue } from 'jotai';
import { formatEstateType, formatPrice, searchByKeyword } from 'utils/utils';
import { Modal } from 'antd';

const MypageEstateCard = ({ estate, onDelete }) => {
  const navigate = useNavigate();
  const token = useAtomValue(tokenAtom);

  // 삭제 처리 함수
  const handleDelete = async () => {
    Modal.confirm({
      content: '매물 등록글을 삭제하시겠습니까?',
      okText: '삭제',
      cancelText: '취소',
      okButtonProps: {
        style: {
          backgroundColor: '#6d885d',
          borderColor: 'none',
          color: 'white',
        },
      },
      cancelButtonProps: {
        style: {
          backgroundColor: 'transparent',
          borderColor: '#6d885d',
          color: '#6d885d',
        },
      },
      onOk: () => {
        try {
          axiosInToken(token).delete(
            `${url}/company/deleteEstateList/${estate.estateNum}`
          );
          onDelete(estate.estateNum); // 부모 컴포넌트에 삭제된 항목을 전달
        } catch (error) {
          console.error('게시글 삭제 중 오류 발생:', error);
        }
      },
      onCancel: () => {
        console.log('Cancel');
      },
    });

    // try {
    //   await axiosInToken(token).delete(
    //     `${url}/company/deleteEstateList/${estate.estateNum}`
    //   );
    //   alert('삭제되었습니다.');
    //   onDelete(estate.estateNum); // 부모 컴포넌트에 삭제된 항목을 전달
    // } catch (error) {
    //   console.error('삭제 중 오류 발생:', error);
    //   alert('삭제 중 문제가 발생했습니다.');
    // }
  };

  return (
    <div className={styles.card}>
      {/* 이미지 및 내용 */}
      {/* <img src={imageUrl} alt={type} className={styles.cardImage} /> */}
      <img
        src={
          estate.estateNum &&
          `${url}/estateImage/${estate.estateImageNums.split(',')[0]}`
        }
        alt="집꾸 리스트 이미지"
        className={styles.cardImage}
      />
      <div className={styles.cardContent}>
        <p className={styles.type}>{formatEstateType(estate.type)}</p>
        <p className={styles.price} style={{ fontWeight: 'bold' }}>
          {formatPrice({
            jeonsePrice: estate.jeonsePrice,
            monthlyPrice: estate.monthlyPrice,
            depositPrice: estate.depositPrice,
            buyPrice: estate.buyPrice,
          })}
        </p>
        <h3 className={styles.rent}></h3>
        <p>
          {estate.jibunAddress} | {estate.size2}㎡({estate.size1}평)
        </p>
        <h3 className={styles.rent}></h3>
        <p className={styles.description}>{estate.title}</p>
      </div>

      {/* 버튼 영역 */}
      <div className={styles.contentWrapper}>
        <Button01
          size="x-small"
          color="sub"
          onClick={() => {
            console.log(estate.estateNum);
            navigate(`/estate`, {
              state: { keyword: estate.jibunAddress },
            }); // 상세보기 네비게이션
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
