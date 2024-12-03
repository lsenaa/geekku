import styles from './HouseDetail.module.scss';
import { useParams } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Button01 from '../../commons/button/Button01';
import HouseDetailAnswerList from './houseDetailAnswer/HouseDetailAnswerList';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { url } from 'lib/axios';
import { useEffect, useState } from 'react';
import {
  formatDate,
  formatEstateType,
  formatPrice,
  processLocation,
} from 'utils/utils';
import TopButton from 'components/layout/topbutton/TopButton';

const HouseDetail = () => {
  let { num } = useParams();
  const [house, setHouse] = useState({
    type: '',
    address1: '',
    address2: '',
    size: '',
    rentType: 'jeonse',
    jeonsePrice: 0,
    monthlyPrice: 0,
    buyPrice: 0,
    depositPrice: 0,
    requestDate: '2000-01-01',
    requestState: false,
    allowPhone: false,
    title: '',
    content: '',
    createdAt: '',
    houseNum: num || 0,
    userId: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${url}/houseDetail/${num}`)
      .then((res) => {
        setHouse({ ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(house);

  return (
    <div className={styles.container}>
      <h2>집꾸 신청내역</h2>
      <section>
        <div className={styles.profile}>
          {house.userProfileImage ? (
            <img
              src={`data:image/png;base64, ${house.userProfileImage}`}
              alt="사용자 프로필 이미지"
              width="30px"
              height="30px"
              style={{ borderRadius: '50px' }}
            />
          ) : (
            <FaUserCircle size="30" color="#6D885D" />
          )}
          <p>{house.nickname ? house.nickname : house.name}</p>
          <p className={styles.createdAt}>{formatDate(house.createdAt)}</p>
        </div>
        <hr className={styles.line} />
      </section>
      <section>
        <div className={styles.sectionTitleWrap}>
          <h3 className={styles.sectionTitle}>원하는 매물 정보</h3>
        </div>
        <hr className={styles.line} />
      </section>
      <section>
        <div className={styles.item}>
          <label>매물 유형</label>
          <p>{formatEstateType(house.type)}</p>
        </div>
        <div className={styles.item}>
          <label>지역</label>
          <p>{`${processLocation(house.address1)} ${house.address2}`}</p>
        </div>
        <div className={styles.item}>
          <label>거래 종류</label>
          <p>
            {house.rentType === 'jeonse' && '전세'}
            {house.rentType === 'monthly' && '월세'}
            {house.rentType === 'buy' && '매매'}
          </p>
        </div>
        <div className={styles.item}>
          <label>희망 평수</label>
          <p>{house.size === 5 ? '기타' : `${house.size}평 이상`}</p>
        </div>
        <div className={styles.item}>
          <label>예산</label>
          <div>
            <p>
              {formatPrice({
                jeonsePrice: house.jeonsePrice,
                monthlyPrice: house.monthlyPrice,
                depositPrice: house.depositPrice,
                buyPrice: house.buyPrice,
              }) + ' 만원'}
            </p>
          </div>
        </div>
        <div className={styles.item}>
          <label>입주 희망 일자</label>
          <p>
            {house.requestState && house.requestDate === '2000-01-01'
              ? '미정'
              : house.requestDate}
          </p>
        </div>
        {house.allowPhone && (
          <div className={styles.item}>
            <label>연락처</label>
            <p>{house.userPhone}</p>
          </div>
        )}
      </section>
      <section>
        <div className={styles.sectionTitleWrap}>
          <h3 className={styles.sectionTitle}>상세 설명</h3>
        </div>
        <hr className={styles.line} />
        <div className={styles.item}>
          <label>제목</label>
          <p>{house.title}</p>
        </div>
        <div className={styles.item}>
          <label>상세 내용</label>
          <p className={styles.content}>{house.content}</p>
        </div>
      </section>
      <div className={styles.btnWrap}>
        <Button01 size="small">
          <Link to={'/house'}>목록으로</Link>
        </Button01>
      </div>
      {/* 답변 리스트 */}
      <HouseDetailAnswerList houseNum={house.houseNum} userId={house.userId} />
      <TopButton />
    </div>
  );
};

export default HouseDetail;
