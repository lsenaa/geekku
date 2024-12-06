import img from '../../../assets/images/interiorEx.png';
import styles from './Card.module.scss';
import { Link } from 'react-router-dom';

const Card = ({ sampleList }) => {
  return (
    <>
      {sampleList.map((sample) => (
        <Link
          to={`/sampleDetail/${sample.sampleNum}`}
          key={sample.sampleNum}
          className={styles.card}
        >
          <div className={styles.fix}>
            <img
              src={sample.coverImage}
              style={{ width: '384px', height: '242px' }}
            />
            <div className={styles.wrapTitle}>
              <div className={styles.title}>{sample.title}</div>
              <div className={styles.company}>
                <div style={{ width: '200px' }} className="title">
                  {sample.companyName}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Card;
