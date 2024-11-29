import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Button01 from '../../commons/button/Button01';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './ReqInteriorDetail.module.scss';
import axios from 'axios';
import { url } from 'lib/axios';
import { useEffect, useState } from 'react';
import { formatEstateType, formatPrice, processLocation } from 'utils/utils';
import ReqInteriorDetailAnswerList from './reqInteriorDetailAnswer/ReqInteriorDetailAnswerList';

const ReqInteriorDetail = () => {
  let { num } = useParams();
  const [interiorall, setInteriorall] = useState({
    addContent: '',
    address1: '',
    address2: '',
    allowPhone: false,
    createdAt: '',
    size: '',
    rentType: '',
    money: '',
    requestState: false,

    title: '',
    type: '',

    requestAllNum: num || 0,
  });
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${url}/interiorAllDetail/${num}`)
      .then((res) => {
        setInteriorall({ ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.container}>
      <h2>방꾸하기 신청내역</h2>
      <section>
        <div className={styles.profile}>
          <FaUserCircle color="#6D885D" size={30} />
          <p>홍길동</p>
          <p className={styles.createdAt}>2024-10-28</p>
        </div>
        <hr className={styles.line} />
      </section>
      <section>
        <div className={styles.title}>
          <h3>원하는 매물 정보</h3>
        </div>
        <hr className={styles.line} />
        <div className={styles.item}>
          <label>매물 유형</label>
          <p>{formatEstateType(interiorall.type)}</p>
        </div>
        <div className={styles.item}>
          <label>지역</label>
          <p>{`${processLocation(interiorall.address1)} ${interiorall.address2}`}</p>
        </div>
        <div className={styles.item}>
          <label>거래 종류</label>
          <p>
            {interiorall.rentType === 'jeonse' && '전세'}
            {interiorall.rentType === 'monthly' && '월세'}
            {interiorall.rentType === 'buy' && '매매'}
          </p>
        </div>

        <div className={styles.item}>
          <label>예산</label>
          <div>
            <p>{interiorall.money + ' 만원'}</p>
          </div>
        </div>

        {interiorall.allowPhone && (
          <div className={styles.item}>
            <label>연락처</label>
            <p>{interiorall.userPhone}</p>
          </div>
        )}
      </section>
      <section>
        <div className={styles.title}>
          <h3>상세 설명</h3>
        </div>
        <hr className={styles.line} />
        <div className={styles.item}>
          <label>제목</label>
          <p>{interiorall.title}</p>
        </div>
        <div className={styles.item}>
          <label>상세 내용</label>
          <p className={styles.content}>{interiorall.addContent}</p>
        </div>
      </section>
      <div className={styles.btnWrap}>
        <Button01 size="small">
          <Link to={'/oneStop'}>목록으로</Link>
        </Button01>
      </div>
      {/* 답변 리스트 */}
      <ReqInteriorDetailAnswerList onestopNum={interiorall.onestopNum} />
    </div>
  );
};

export default ReqInteriorDetail;
