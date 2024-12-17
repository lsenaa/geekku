import styles from './OnestopMain.module.scss';
import Button01 from '../commons/button/Button01';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from 'lib/axios';
import { useAtomValue } from 'jotai';
import { Modal, Pagination } from 'antd';
import OnestopList from './onestopList/OnestopList';
import { userAtom } from 'store/atoms';

const OnestopMain = () => {
  const [onestopList, setOnestopList] = useState([]);
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();
  const [type, setType] = useState('address1');
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

  // 작성 버튼
  const onClickWrite = () => {
    if (user.userId) {
      navigate('/onestop/write');
    } else if (user.companyId) {
      Modal.info({
        content: '일반회원만 이용가능합니다.',
      });
    } else {
      Modal.info({
        content: '로그인 후 이용가능합니다.',
      });
      navigate('/login');
    }
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
      .get(`${url}/onestopList`, { params })
      .then((res) => {
        let pageInfo = res.data.pageInfo;
        setOnestopList([...res.data.onestopList]);
        setPageInfo(pageInfo);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className={styles.container}>
      <h2>한번에꾸하기 신청 목록</h2>
      <div className={styles.topWrap}>
        <div className={styles.searchWrap}>
          <select
            className={styles.select}
            onChange={(e) => setType(e.target.value)}
            value={type}
          >
            <option value="address1">지역</option>
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
            maxLength={40}
          />
          <button className={styles.searchBtn} onClick={() => fetchData(1)}>
            검색
          </button>
        </div>
        <Button01 size="small" onClick={onClickWrite}>
          작성하기
        </Button01>
      </div>
      <OnestopList onestopList={onestopList} />
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

export default OnestopMain;
