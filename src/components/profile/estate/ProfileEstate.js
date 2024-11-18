import styles from './ProfileEstate.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import esateImg01 from 'assets/images/estate01.png';
import esateImg02 from 'assets/images/estate02.png';
import esateImg03 from 'assets/images/estate03.png';
import { Link } from 'react-router-dom';

const ProfileEstate = () => {
  const estateData = [
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
    <div className={styles.container}>
      {/* 사용자 정보 카드 */}
      <div className={styles.profile}>
        <FaUserCircle color="#6D885D" size={100} />
        <h4>홍길동</h4>
        <p>kosta123</p>
        <p>kosta@gmail.com</p>
        <hr />
        <ul className={styles.sidebar}>
          <p className={styles.sectionTitle}>집꾸하기</p>
        </ul>
      </div>

      <div className={styles.contentWrap}>
        <div className={styles.subNav}>
          <p className={styles.active}>매물 등록 내역</p>
        </div>

        {/* 매물 등록내역 리스트 */}
        <ul className={styles.estateListWrap}>
          {estateData.map((estate, i) => (
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
                  <p className={styles.title}>{estate.title}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileEstate;
