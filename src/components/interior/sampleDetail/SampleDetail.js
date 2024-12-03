import styles from './SampleDetail.module.scss';
import cover from '../../../assets/images/cover.png';
import icon from '../../../assets/images/usericon.png';
import houseType from '../../../assets/images/houseType.png';
import size from '../../../assets/images/size.png';
import possible from '../../../assets/images/possible.png';
import area from '../../../assets/images/area.png';
import Button01 from 'components/commons/button/Button01';
import { useNavigate } from 'react-router';

const SampleDetail = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.coverImgWrap}>
        <img src={cover} alt="커버사진" />
      </div>
      <div className={styles.all}>
        <div className={styles.title}>
          허름했던 농가주택을 살기 좋은 집으로 대변신 !
        </div>
        <div className={styles.contentWrap}>
          <div className={styles.user}>
            <img src={icon} alt="유저아이콘" style={{ height: '30px' }} />
            <div className={styles.nameInfo}>
              <p id={styles.name}>코스타 인테리어</p>
              <p id={styles.info}>모던 is done..</p>
            </div>
          </div>
          <div className={styles.type}>
            <div>
              <img src={houseType} alt="주거형태" />
              <p>농가주택</p>
            </div>
            <div>
              <img src={size} alt="평수" />
              <p>60평</p>
            </div>
            <div>
              <img src={possible} alt="부분시공 가능여부" />
              <p>전체시공</p>
            </div>
            <div>
              <img src={area} alt="지역" />
              <p>강원도</p>
            </div>
          </div>
          <div className={styles.content}>에디터 내용 ~~~~~~</div>
        </div>
        <Button01 size="small" onClick={() => navigate('/sampleList')}>
          목록으로
        </Button01>
      </div>
    </div>
  );
};

export default SampleDetail;
