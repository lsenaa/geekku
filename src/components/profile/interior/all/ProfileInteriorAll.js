import styles from './ProfileInteriorAll.module.scss';
import sampleImg from 'assets/images/InteriorExam.jpg';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

const ProfileInteriorAll = () => {
  const sampleData = [
    {
      title: '당산 삼성 래미안 4차 58평형 모던브라운 인테리어',
      image: sampleImg,
    },
    {
      title: 'TV없는 집: 호텔의 느낌을 입히다.',
      image: sampleImg,
    },
    {
      title: "'7가지' 벽지가 들어간 네이비톤 하우스",
      image: sampleImg,
    },
    {
      title: '나에게 맞는 주방은 이렇게 만들어야 합니다.',
      image: sampleImg,
    },
    {
      title: '현관 방향을 바꾸고 기본에 충실한 모던 디자인 예시',
      image: sampleImg,
    },
    {
      title:
        '2bay 구축의 단점을 극복하고, 화이트 톤의 깔끔한 인테리어로 리모델링',
      image: sampleImg,
    },
  ];

  const reviewData = [
    {
      content:
        '리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 ',
      image: sampleImg,
      createdAt: '2024-10-27',
    },
    {
      content:
        '리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 ',
      image: sampleImg,
      createdAt: '2024-10-27',
    },
  ];

  return (
    <>
      <section className={styles.section}>
        <h3>
          시공사례 <span>26</span>
        </h3>
        <div className={styles.more}>
          <Link to={'#'}>
            더보기
            <IoIosArrowForward />
          </Link>
        </div>
        <ul className={styles.sampleWrap}>
          {sampleData.map((sample, i) => (
            <li key={i}>
              <Link to={'/'}>
                <div className={styles.sampleImgWrap}>
                  <img src={sample.image} alt="시공사례 이미지" />
                </div>
                <div className={styles.textWrap}>
                  <p>{sample.title}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.section}>
        <h3>
          사용자 리뷰 <span>10</span>
        </h3>
        <div className={styles.more}>
          <Link to={'#'}>
            더보기
            <IoIosArrowForward />
          </Link>
        </div>
        <ul className={styles.reviewWrap}>
          {reviewData.map((review, i) => (
            <li key={i}>
              <Link to={'/'}>
                <div className={styles.reviewImgWrap}>
                  <img src={review.image} alt="리뷰 이미지" />
                </div>
                <p className={styles.content}>{review.content}</p>
                <p>{review.createdAt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.section}>
        <h3>업체정보</h3>
        <div className={styles.more}>
          <Link to={'#'}>
            소개글 보기
            <IoIosArrowForward />
          </Link>
        </div>
        <div className={styles.detailWrap}>
          <div className={styles.detailRow}>
            <p className={styles.detailTitle}>시공분야</p>
            <p className={styles.detailContent}>종합인테리어</p>
          </div>
          <div className={styles.detailRow}>
            <p className={styles.detailTitle}>경력</p>
            <p className={styles.detailContent}>10년</p>
          </div>
          <div className={styles.detailRow}>
            <p className={styles.detailTitle}>보수기간</p>
            <p className={styles.detailContent}>1년</p>
          </div>
          <div className={styles.detailRow}>
            <p className={styles.detailTitle}>최근계약</p>
            <p className={styles.detailContent}>52건</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileInteriorAll;
