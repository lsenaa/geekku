import styles from './BookmarkInterior.module.scss';
import { Link } from 'react-router-dom';
import interiorImg from 'assets/images/InteriorExam.jpg';
import bookmarkImg from 'assets/images/bookmarkTrue.png';

const BookmarkInterior = () => {
  const bookmarkData = [
    {
      name: '코스타 인테리어',
      loc: '경상도',
      type: '전체시공/부분시공',
      image: interiorImg,
    },
    {
      name: 'OK 인테리어 사무소',
      loc: '충청도',
      type: '전체시공',
      image: interiorImg,
    },
    {
      name: '모던하우스',
      loc: '전라도',
      type: '부분시공',
      image: interiorImg,
    },
    {
      name: '코스타 인테리어',
      loc: '경상도',
      type: '전체시공/부분시공',
      image: interiorImg,
    },
  ];

  return (
    <ul className={styles.bookmarkContainer}>
      {bookmarkData.map((interior, i) => (
        <li key={i}>
          <Link to={'#'}>
            <div className={styles.imgWrapper}>
              <img src={interior.image} alt="방꾸하기 이미지" />
            </div>
            <div className={styles.contentWrapper}>
              <div className={styles.textWrapper}>
                <p className={styles.name}>{interior.name}</p>
                <p className={styles.loc}>{interior.loc}</p>
              </div>
              <div className={styles.bookmarkWrap}>
                <p className={styles.type}>{interior.type}</p>
                <img src={bookmarkImg} alt="북마크 이미지" />
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BookmarkInterior;
