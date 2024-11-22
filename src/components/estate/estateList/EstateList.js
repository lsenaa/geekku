import styles from './EstateList.module.scss';
import listImg from '../../../assets/images/estateListImg.png';

const EstateList = ({ isModalOpen, setIsModalOpen, estateList }) => {
  // console.log(estateList);

  return (
    <ul className={styles.listWrapper}>
      {/* <li onClick={() => setIsModalOpen(!isModalOpen)}>
        <div className={styles.imgWrapper}>
          <img src={listImg} alt="리스트 이미지" />
        </div>
        <div className={styles.textWrapper}>
          <p>시골농가주택</p>
          <p className={styles.price}>월세 300/33</p>
          <p>충청북도 단양군 상세주소주소</p>
          <p>리모델링한 시골농가주택 임대합니다. 많은 관심 부탁드려요.</p>
        </div>
      </li>
      <li>
        <div className={styles.imgWrapper}>
          <img src={listImg} alt="리스트 이미지" />
        </div>
        <div className={styles.textWrapper}>
          <p>시골농가주택</p>
          <p className={styles.price}>월세 300/33</p>
          <p>충청북도 단양군 상세주소주소</p>
          <p>리모델링한 시골농가주택 임대합니다. 많은 관심 부탁드려요.</p>
        </div>
      </li>
      <li>
        <div className={styles.imgWrapper}>
          <img src={listImg} alt="리스트 이미지" />
        </div>
        <div className={styles.textWrapper}>
          <p>시골농가주택</p>
          <p className={styles.price}>월세 300/33</p>
          <p>충청북도 단양군 상세주소주소</p>
          <p>리모델링한 시골농가주택 임대합니다. 많은 관심 부탁드려요.</p>
        </div>
      </li>
      <li>
        <div className={styles.imgWrapper}>
          <img src={listImg} alt="리스트 이미지" />
        </div>
        <div className={styles.textWrapper}>
          <p>시골농가주택</p>
          <p className={styles.price}>월세 300/33</p>
          <p>충청북도 단양군 상세주소주소</p>
          <p>리모델링한 시골농가주택 임대합니다. 많은 관심 부탁드려요.</p>
        </div>
      </li> */}
    </ul>
  );
};

export default EstateList;
