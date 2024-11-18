import img from '../../../assets/images/interiorEx.png';
import styles from './Card.module.scss';
import { Link } from 'react-router-dom';

const Card = () => {
  return (
    <Link to="/sampleDetail" className={styles.card}>
      <div className={styles.fix}>
        <img src={img} style={{ width: '384px', height: '242px' }} />
        <div className={styles.wrapTitle}>
          <div className={styles.title}>
            허름했던 농가주택을 살기좋은 집으로 대변신!
          </div>
          <div className={styles.company}>
            <div style={{ width: '200px' }} className="title">
              코스타 인테리어
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
