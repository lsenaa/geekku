import styles from './OnestopMain.module.scss';
import Button01 from '../commons/button/Button01';
import OnestopList from './onestopList/OnestopList';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';

const OnestopMain = () => {
  return (
    <div className={styles.container}>
      <h2>상담신청 리스트</h2>
      <div className={styles.topWrap}>
        <div className={styles.searchWrap}>
          <select className={styles.select}>
            <option>지역</option>
            <option>거래종류</option>
            <option>제목</option>
          </select>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="검색어를 입력해주세요."
          />
          <button className={styles.searchBtn}>검색</button>
        </div>
        <Button01 size="small">
          <Link to={'/onestopWrite'}>작성하기</Link>
        </Button01>
      </div>
      <OnestopList />
      <Pagination defaultCurrent={1} total={50} />
    </div>
  );
};

export default OnestopMain;
