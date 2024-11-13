import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Button01 from '../../commons/button/Button01';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './ReqInteriorDetail.module.scss';
import { useNavigate } from 'react-router';
import ReqInteriorDetailAnswerList from './reqInteriorDetailAnswer/ReqInteriorDetailAnswerList';

const ReqInteriorDetail = () => {
  let { num } = useParams();
  const navigate = useNavigate();
  const handleListButton = () => {
    navigate('/reqInterior');
  };

  return (
    <div className={styles.container}>
      <h2>한번에 꾸미기 신청내역</h2>
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
          <p>시골 농가 주택</p>
        </div>
        <div className={styles.item}>
          <label>지역</label>
          <p>충청북도</p>
          <p>단양군</p>
        </div>
        <div className={styles.item}>
          <label>거래 종류</label>
          <p>전세</p>
        </div>
        <div className={styles.item}>
          <label>희망 평수</label>
          <p>30평 이상</p>
        </div>
        <div className={styles.item}>
          <label>예산</label>
          <div>
            <p style={{ marginBottom: '8px' }}>전세가</p>
            <p>1,000만원</p>
          </div>
        </div>
        <div className={styles.item}>
          <label>입주 희망 일자</label>
          <p>2024-10-28</p>
        </div>
        <div className={styles.item}>
          <label>연락처</label>
          <p>010-1234-5678</p>
        </div>
      </section>
      <section>
        <div className={styles.title}>
          <h3>상세 설명</h3>
        </div>
        <hr className={styles.line} />
        <div className={styles.item}>
          <label>제목</label>
          <p>집꾸 신청합니다.</p>
        </div>
        <div className={styles.item}>
          <label>상세 내용</label>
          <p className={styles.content}>
            상세 내용 상세 내용 상세 내용 상세 내용 상세 내용 상세 내용 상세
            내용
          </p>
        </div>
      </section>
      <div className={styles.btnWrap}>
        <Button01 size="small">
          <Link to={'/houseMain'}>목록으로</Link>
        </Button01>
      </div>
      {/* 답변 리스트 */}
      <ReqInteriorDetailAnswerList />
    </div>
  );
};

export default ReqInteriorDetail;
