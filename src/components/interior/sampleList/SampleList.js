import Filter from 'components/commons/filter/Filter';
import styles from './Sample.module.scss';
import Card from './Card';
import { Link } from 'react-router-dom';

const SampleList = () => {
  return (
    <div className={styles.all}>
      <p className={styles.title}>시공사례</p>
      <div className={styles.midBar}>
        <Filter />
        <Link to="/sampleRegister">
          <button id={styles.regBtn}>등록하기</button>
        </Link>
      </div>
      <div className={styles.cardList}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default SampleList;
