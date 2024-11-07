import styles from './EstateSearch.module.scss';
import listImg from '../../assets/images/estateListImg.png'
import { Link } from 'react-router-dom';

const EstateSearch = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topWrapper}>
        <ul className={styles.typeSelect}>
          <li>시골농가주택</li>
          <li>전원주택</li>
          <li>아파트/빌라</li>
          <li>농장/토지</li>
        </ul>
        <div className={styles.searchWrapper}>
          <input type="test" placeholder="매물을 검색해주세요."/>
          <button>검색</button>
        </div>
      </div>

      <div className={styles.bodyWrapper}>
        {/* 매물 리스트 */}
        <ul className={styles.listWrapper}>
          <li>
            <Link to={"#"}>
              <div className={styles.imgWrapper}>
                <img src={listImg} alt="리스트 이미지" />
              </div>
              <div className={styles.textWrapper}>
                <p>시골농가주택</p>
                <p className={styles.price}>월세 300/33</p>
                <p>충청북도 단양군 상세주소주소</p>
                <p>리모델링한 시골농가주택 임대합니다. 많은 관심 부탁드려요.</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to={"#"}>
              <div className={styles.imgWrapper}>
                <img src={listImg} alt="리스트 이미지" />
              </div>
              <div className={styles.textWrapper}>
                <p>시골농가주택</p>
                <p className={styles.price}>월세 300/33</p>
                <p>충청북도 단양군 상세주소주소</p>
                <p>리모델링한 시골농가주택 임대합니다. 많은 관심 부탁드려요.</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to={"#"}>
              <div className={styles.imgWrapper}>
                <img src={listImg} alt="리스트 이미지" />
              </div>
              <div className={styles.textWrapper}>
                <p>시골농가주택</p>
                <p className={styles.price}>월세 300/33</p>
                <p>충청북도 단양군 상세주소주소</p>
                <p>리모델링한 시골농가주택 임대합니다. 많은 관심 부탁드려요.</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to={"#"}>
              <div className={styles.imgWrapper}>
                <img src={listImg} alt="리스트 이미지" />
              </div>
              <div className={styles.textWrapper}>
                <p>시골농가주택</p>
                <p className={styles.price}>월세 300/33</p>
                <p>충청북도 단양군 상세주소주소</p>
                <p>리모델링한 시골농가주택 임대합니다. 많은 관심 부탁드려요.</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EstateSearch;