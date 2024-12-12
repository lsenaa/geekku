import styles from './ReqInteriorMain.module.scss';
import Button01 from '../commons/button/Button01';
import ReqInteriorList from './reqInteriorList/ReqInteriorList';
import { Modal, Pagination } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from 'lib/axios';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from 'store/atoms';

const ReqInteriorMain = () => {
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const [interiorAllList, setInteriorall] = useState([]);
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
      navigate('/requestInterior/write');
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

    if (type === 'workTypeValue') {
      const keywordMapping = {
        전체: true,
        부분: false,
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
        console.error(err);
      });
  };
  return (
    <div className={styles.container}>
      <h2>방꾸 신청 목록</h2>
      <div className={styles.topWrap}>
        <div className={styles.searchWrap}>
          <select
            className={styles.select}
            onChange={(e) => setType(e.target.value)}
            value={type}
          >
            <option value="address1">지역</option>
            <option value="workType">시공종류</option>
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
