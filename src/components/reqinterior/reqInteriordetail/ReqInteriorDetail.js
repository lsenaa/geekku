import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Button01 from '../../commons/button/Button01';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './ReqInteriorDetail.module.scss';
import axios from 'axios';
import { url } from 'lib/axios';
import { useEffect, useState } from 'react';
import {
  formatEstateType,
  formatPrice,
  processLocation,
  formatDate,
} from 'utils/utils';

import ReqInteriorDetailAnswerList from './reqInteriorDetailAnswer/ReqInteriorDetailAnswerList';

const ReqInteriorDetail = () => {
  let { num } = useParams();
  const [interiorAll, setInteriorAll] = useState({
    requestAllNum: num || 0,
    address1: '',
    address2: '',
    allowPhone: '',
    createAt: '',
    interiorType: '',
    money: '',
    name: '',
    phone: '',
    size: '',
    title: '',
    type: '',
    view_count: '',
    workType: '',
  });
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${url}/interiorAllDetail/${num}`)
      .then((res) => {
        setInteriorAll({ ...res.data });
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
          <div className={styles.profileImg}>
            <img
              src={
                interiorAll.profileImage
                  ? `data:image/png;base64,${interiorAll.profileImage}`
                  : ''
              }
              alt="프로필이미지"
            />
          </div>
          <p>
            {interiorAll.nickname ? interiorAll.nickname : interiorAll.name}
          </p>
          <p className={styles.createdAt}>{formatDate(interiorAll.createAt)}</p>
        </div>
        <hr className={styles.line} />
      </section>
      <section>
        <div className={styles.title}>
          <h3>원하는 매물 정보</h3>
        </div>
        <hr className={styles.line} />
        <div className={styles.item}>
          <label>건물 유형</label>
          <p>{formatEstateType(interiorAll.type)}</p>
        </div>
        <div className={styles.item}>
          <label>지역</label>
          <p>{`${processLocation(interiorAll.address1)} ${interiorAll.address2}`}</p>
        </div>
        <div className={styles.item}>
          <label>시공 유형</label>
          <p>
            {interiorAll.workType == 0 && '전체시공'}
            {interiorAll.workType == 1 && '부분시공'}
          </p>
        </div>
        <div className={styles.item}>
          <label>시공 종류</label>
          <p>{interiorAll.interiorType}</p>
        </div>
        <div className={styles.item}>
          <label>시공 평수</label>
          <p>{interiorAll.size == 10 && '10평 이상'}</p>
          <p>{interiorAll.size == 20 && '20평 이상'}</p>
          <p>{interiorAll.size == 30 && '30평 이상'}</p>
          <p>{interiorAll.size == 40 && '40평 이상'}</p>
          <p>{interiorAll.size == 5 && '50평 이상'}</p>
        </div>

        <div className={styles.item}>
          <label>예산</label>
          <div>
            <p>{interiorAll.money + ' 만원'}</p>
          </div>
        </div>

        {interiorAll.allowPhone && (
          <div className={styles.item}>
            <label>연락처</label>
            <p>{interiorAll.phone}</p>
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
          <p>{interiorAll.title}</p>
        </div>
        <div className={styles.item}>
          <label>상세 내용</label>
          <p className={styles.content}>{interiorAll.addContent}</p>
        </div>
      </section>
      <div className={styles.btnWrap}>
        <Button01 size="small">
          <Link to={'/requestInterior'}>목록으로</Link>
        </Button01>
      </div>
      {/* 답변 리스트 */}
      <ReqInteriorDetailAnswerList requestAllNum={interiorAll.requestAllNum} />
    </div>
  );
};

export default ReqInteriorDetail;
