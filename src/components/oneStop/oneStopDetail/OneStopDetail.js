import React from 'react';
import { useParams } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Button01 from '../../commons/button/Button01';
import styles from './OnestopDetail.module.scss';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { url } from 'lib/axios';
import { useEffect, useState } from 'react';
import { formatEstateType, formatPrice, processLocation } from 'utils/utils';
import OnestopDetailAnswerList from './oneStopDetailAnswer/OnestopDetailAnswerList';
import { useSetAtom, useAtom, useAtomValue } from 'jotai';
import {
  userNameAtom,
  alarmsAtom,
  userAtom,
  tokenAtom,
} from '../../../store/atoms';
const OnestopDetail = () => {
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);

  //디버깅
  useEffect(() => {
    setUser(user);
  });
  console.log('원스탑 답변 작성', user);

  let { num } = useParams();
  const [onestop, setOnestop] = useState({
    type: '',
    address1: '',
    address2: '',
    size: '',
    rentType: '',
    jeonsePrice: 0,
    monthlyPrice: 0,
    buyPrice: 0,
    depositPrice: 0,
    requestState: false,
    allowPhone: false,
    title: '',
    content: '',
    createdAt: '',
    onestopNum: num || 0,
  });
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${url}/onestopDetail/${num}`)
      .then((res) => {
        setOnestop({ ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <h2>한번에꾸하기 신청내역</h2>
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
          <p>{formatEstateType(onestop.type)}</p>
        </div>
        <div className={styles.item}>
          <label>지역</label>
          <p>{`${processLocation(onestop.address1)} ${onestop.address2}`}</p>
        </div>
        <div className={styles.item}>
          <label>거래 종류</label>
          <p>
            {onestop.rentType === 'jeonse' && '전세'}
            {onestop.rentType === 'monthly' && '월세'}
            {onestop.rentType === 'buy' && '매매'}
          </p>
        </div>
        <div className={styles.item}>
          <label>희망 평수</label>
          <p>{onestop.size === 5 ? '기타' : `${onestop.size}평 이상`}</p>
        </div>
        <div className={styles.item}>
          <label>예산</label>
          <div>
            <p>{onestop.money + ' 만원'}</p>
          </div>
        </div>

        {onestop.allowPhone && (
          <div className={styles.item}>
            <label>연락처</label>
            <p>{onestop.userPhone}</p>
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
          <p>{onestop.title}</p>
        </div>
        <div className={styles.item}>
          <label>상세 내용</label>
          <p className={styles.content}>{onestop.content}</p>
        </div>
      </section>
      <div className={styles.btnWrap}>
        <Button01 size="small">
          <Link to={'/oneStop'}>목록으로</Link>
        </Button01>
      </div>
      {/* 답변 리스트 */}
      <OnestopDetailAnswerList onestopNum={onestop.onestopNum} />
    </div>
  );
};

export default OnestopDetail;
