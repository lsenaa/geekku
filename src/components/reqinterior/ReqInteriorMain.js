import styles from './ReqInteriorMain.module.scss';
import Button01 from '../commons/button/Button01';
import ReqInteriorList from './reqInteriorList/ReqInteriorList';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { url } from 'lib/axios';
import { useEffect, useState } from 'react';

const ReqInteriorMain = () => {
  const [interiorAllList, setInteriorall] = useState([]);
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
      .get(`${url}/interiorAllList`, { params })
      .then((res) => {
        let pageInfo = res.data.pageInfo;
        setInteriorall([...res.data.interiorAllList]);
        setPageInfo(pageInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.container}>
      <h2>방꾸 신청 목록</h2>
      <div className={styles.topWrap}>
        <div className={styles.searchWrap}>
          <select className={styles.select}>
            <option>지역</option>
            <option>시공종류</option>
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
          <Link to={'/requestInterior/write'}>작성하기</Link>
        </Button01>
      </div>
      <ReqInteriorList interiorAllList={interiorAllList} />
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

export default ReqInteriorMain;
