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
      <h2>방꾸 신청내역</h2>
      <section>
        <div className={styles.profile}>
          <FaUserCircle color="#6D885D" size={30} />
          <p>코스타</p>

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
          <label>희망 평수</label>
          <p>31평~35평</p>
        </div>
        <div className={styles.item}>
          <label>예산</label>
          <div>
            <p>5,000만원</p>
          </div>
        </div>
        <div className={styles.item}>
          <label>시공 종류</label>
          <p>부분 시공</p>
        </div>
        <div className={styles.item}>
          <label>인테리어 시공</label>
          <p>도배 바닥 몰딩 샷시 조명 베란다</p>
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
          <Link to={'/requestInterior'}>목록으로</Link>
        </Button01>
      </div>
      {/* 답변 리스트 */}
      <ReqInteriorDetailAnswerList />
    </div>
  );
};

export default ReqInteriorDetail;
