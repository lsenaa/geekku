import styles from './SampleDetail.module.scss';
import cover from '../../../assets/images/cover.png';
import icon from '../../../assets/images/usericon.png';
import houseType from '../../../assets/images/houseType.png';
import size from '../../../assets/images/size.png';
import possible from '../../../assets/images/possible.png';
import area from '../../../assets/images/area.png';

const SampleDetail = () => {
  return (
    <div>
      <img src={cover} alt="커버사진" width="100%" height="595px" />
      <div className={styles.all}>
        <div className={styles.title}>
          허름했던 농가주택을 살기 좋은 집으로 대변신 !
        </div>
        <div>
          <div className={styles.user}>
            <img src={icon} alt="유저아이콘" style={{ height: '40px' }} />
            <div className={styles.nameInfo}>
              <span id={styles.name}>코스타 인테리어</span>
              <span id={styles.info}>모던 is done..</span>
            </div>
          </div>
          <div className={styles.type}>
            <span>
              <img src={houseType} alt="주거형태" /> 농가주택
            </span>
            <span>
              <img src={size} alt="평수" /> 60평
            </span>
            <span>
              <img src={possible} alt="부분시공 가능여부" /> 전체시공
            </span>
            <span>
              <img src={area} alt="지역" /> 강원도
            </span>
          </div>
          <div className={styles.content}>에디터 내용 ~~~~~~</div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SampleDetail;
