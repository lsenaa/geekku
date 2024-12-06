import { url } from 'lib/axios';
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
            <div className={styles.imgWrap}>
              <img src={`${url}/sampleImage/${sample.coverImage}`} />
            </div>
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
