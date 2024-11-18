import Filter from 'components/commons/filter/Filter';
import styles from './Sample.module.scss';
import Card from './Card';

const SampleList = () => {
  return (
    <div className={styles.all}>
      <p>시공사례</p>
      <div className={styles.midBar}>
        <Filter />
        <button id={styles.regBtn}>등록하기</button>
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
