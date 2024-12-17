import styles from './ProfileInteriorAll.module.scss';
import { url } from 'lib/axios';
import { IoIosArrowForward } from 'react-icons/io';
import { Link, useOutletContext } from 'react-router-dom';
import { formatDate } from 'utils/utils';

const ProfileInteriorAll = () => {
  const { detailInfo } = useOutletContext();
  const { num } = useOutletContext();

  return (
    <>
      <section className={styles.section}>
        <h3>
          시공사례 <span>{detailInfo.sampleCount}</span>
        </h3>
        <div className={styles.more}>
          <Link to={`/profile/interior/${num}/sample`}>
            더보기
            <IoIosArrowForward />
          </Link>
        </div>
        <ul className={styles.sampleWrap}>
          {detailInfo.sampleDetail
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3)
            .map((sample, i) => (
              <li key={i}>
                <Link to={`/sampleDetail/${sample.sampleNum}`}>
                  <div className={styles.sampleImgWrap}>
                    <img
                      src={`${url}/sampleImage/${sample.coverImage}`}
                      alt="시공사례 이미지"
                    />
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
          사용자 리뷰 <span>{detailInfo.reviewCount}</span>
        </h3>
        <div className={styles.more}>
          <Link to={`/profile/interior/${num}/review`}>
            더보기
            <IoIosArrowForward />
          </Link>
        </div>
        <ul className={styles.reviewWrap}>
          {detailInfo.reviewDetail
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 2)
            .map((review, i) => (
              <li key={i}>
                <Link to={`/profile/interior/${num}/review`}>
                  <div className={styles.reviewImgWrap}>
                    <img
                      src={`${url}/reviewImage/${review.imageNums.split(',')[0]}`}
                      alt="리뷰 이미지"
                    />
                  </div>
                  <p className={styles.content}>{review.content}</p>
                  <p style={{ width: '100px' }}>
                    {formatDate(review.createdAt)}
                  </p>
                </Link>
              </li>
            ))}
        </ul>
      </section>
      <section className={styles.section}>
        <h3>업체정보</h3>
        <div className={styles.more}>
          <Link to={`/profile/interior/${num}/introduce`}>
            소개글 보기
            <IoIosArrowForward />
          </Link>
        </div>
        <div className={styles.detailWrap}>
          <div className={styles.detailRow}>
            <p className={styles.detailTitle}>시공분야</p>
            <p className={styles.detailContent}>
              {detailInfo.interiorDetail.possiblePart === true
                ? '종합/부분 인테리어'
                : '종합인테리어'}
            </p>
          </div>
          <div className={styles.detailRow}>
            <p className={styles.detailTitle}>경력</p>
            <p className={styles.detailContent}>
              {detailInfo.interiorDetail.period}년
            </p>
          </div>
          <div className={styles.detailRow}>
            <p className={styles.detailTitle}>보수기간</p>
            <p className={styles.detailContent}>
              {detailInfo.interiorDetail.repairDate}개월
            </p>
          </div>
          <div className={styles.detailRow}>
            <p className={styles.detailTitle}>최근계약</p>
            <p className={styles.detailContent}>
              {detailInfo.interiorDetail.recentCount}건
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileInteriorAll;
