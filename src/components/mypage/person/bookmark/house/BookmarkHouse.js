import styles from './BookmarkHouse.module.scss';
import { Link } from 'react-router-dom';
import esateImg01 from 'assets/images/estate01.png';
import esateImg02 from 'assets/images/estate02.png';
import esateImg03 from 'assets/images/estate03.png';
import bookmarkImg from 'assets/images/bookmarkTrue.png';

const BookmarkHouse = () => {
  const bookmarkData = [
    {
      type: '전원주택',
      price: '월세 300/33',
      location: '충청남도 태안군',
      size: '109㎡ (30평)',
      title: '시골 빈집 전원주택',
      image: esateImg01,
    },
    {
      type: '아파트',
      price: '월세 500/43',
      location: '경상북도 예천군',
      size: '109㎡ (30평)',
      title: '깔끔하게 리모델링한 아파트',
      image: esateImg02,
    },
    {
      type: '시골농가주택',
      price: '월세 100/33',
      location: '충청북도 단양군',
      size: '109㎡ (30평)',
      title: '리모델링한 시골농가주택',
      image: esateImg03,
    },
    {
      type: '전원주택',
      price: '월세 300/33',
      location: '충청남도 태안군',
      size: '109㎡ (30평)',
      title: '시골 빈집 전원주택',
      image: esateImg01,
    },
    {
      type: '아파트',
      price: '월세 500/43',
      location: '경상북도 예천군',
      size: '109㎡ (30평)',
      title: '깔끔하게 리모델링한 아파트',
      image: esateImg02,
    },
    {
      type: '시골농가주택',
      price: '월세 100/33',
      location: '충청북도 단양군',
      size: '109㎡ (30평)',
      title: '리모델링한 시골농가주택',
      image: esateImg03,
    },
    {
      type: '전원주택',
      price: '월세 300/33',
      location: '충청남도 태안군',
      size: '109㎡ (30평)',
      title: '시골 빈집 전원주택',
      image: esateImg01,
    },
    {
      type: '아파트',
      price: '월세 500/43',
      location: '경상북도 예천군',
      size: '109㎡ (30평)',
      title: '깔끔하게 리모델링한 아파트',
      image: esateImg02,
    },
  ];

  return (
    <ul className={styles.bookmarkContainer}>
      {bookmarkData.map((estate, i) => (
        <li key={i}>
          <Link to={'#'}>
            <div className={styles.imgWrapper}>
              <img src={estate.image} alt="집꾸하기 이미지" />
            </div>
            <div className={styles.textWrapper}>
              <p className={styles.type}>{estate.type}</p>
              <p className={styles.price}>{estate.price}</p>
              <div className={styles.locSizeWrapper}>
                <p>{estate.location}</p>
                <p>{estate.size}</p>
              </div>
              <div className={styles.bookmarkWrap}>
                <p>{estate.title}</p>
                <img src={bookmarkImg} alt="북마크 이미지" />
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BookmarkHouse;
