import styles from './HouseMain.module.scss';
import Button01 from '../commons/button/Button01';
import HouseList from './houseList/HouseList';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { url } from 'lib/axios';
import axios from 'axios';
import { Pagination } from 'antd';

const HouseMain = () => {
  const [houseList, setHouseList] = useState([]);
  const [type, setType] = useState('location');
  const [keyword, setKeyword] = useState('');
  const [pageInfo, setPageInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchData(1);
  }, []);

  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') {
      fetchData(1);
    }
  };

  // 페이지 변경
  const onChangePage = (value) => {
    setCurrentPage(value);
    fetchData(value);
  };

  const fetchData = (page) => {
    const params = {};
    params.page = page;
    if (type !== '') params.type = type;
    if (keyword !== '') params.keyword = keyword;

    if (type === 'rentType') {
      const keywordMapping = {
        매매: 'buy',
        월세: 'monthly',
        전세: 'jeonse',
      };
      params.keyword = keywordMapping[keyword] || keyword;
    }

    axios
      .get(`${url}/houseList`, { params })
      .then((res) => {
        let pageInfo = res.data.pageInfo;
        setHouseList([...res.data.houseList]);
        setPageInfo(pageInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <h2>집꾸 신청 목록</h2>
      <div className={styles.topWrap}>
        <div className={styles.searchWrap}>
          <select
            className={styles.select}
            onChange={(e) => setType(e.target.value)}
            value={type}
          >
            <option value="location">지역</option>
            <option value="rentType">거래종류</option>
            <option value="title">제목</option>
          </select>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="검색어를 입력해주세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyUp={handleSearchEnter}
          />
          <button className={styles.searchBtn} onClick={() => fetchData(1)}>
            검색
          </button>
        </div>
        <Button01 size="small">
          <Link to={'/house/write'}>작성하기</Link>
        </Button01>
      </div>
      <HouseList houseList={houseList} />
      <Pagination
        defaultCurrent={1}
        current={currentPage}
        pageSize={10}
        total={pageInfo.totalCount}
        onChange={(value) => onChangePage(value)}
      />
    </div>
  );
};

export default HouseMain;
