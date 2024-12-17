import { Modal, Spin } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { url } from 'lib/axios';
import axios from 'axios';
import styles from '../modals/JoinModal.module.scss';
import styles2 from '../Join.module.scss';

const JoinModal = ({ open, close, onConfirm }) => {
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태
  const [results, setResults] = useState([]); // 조회 결과 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreRef = useRef();

  const handleClose = () => {
    setSearchQuery('');
    setResults([]);
    setPage(1);
    setTotalCount(0);
    setHasMore(true);
    setIsLoading(false);
    close();
  };

  const fetchResults = async (query, pageNo) => {
    setIsLoading(true);
    try {
      const params = { pageNo, numOfRows: 10 };

      if (query.includes('-')) {
        params.jurirno = query;
      } else if (isNaN(query)) {
        if (/^[가-힣]+$/.test(query)) {
          if (query.length >= 2 && query.length <= 3) {
            params.brkrNm = query;
          } else {
            params.bsnmCmpnm = query;
          }
        }
      } else {
        params.jurirno = query;
      }

      const response = await axios.get(`${url}/searchEstate`, { params });
      const resultData = response.data?.EDBrokers?.field || [];
      const total = response.data?.EDBrokers?.totalCount || 0;
      setResults((prev) =>
        pageNo === 1 ? resultData : [...prev, ...resultData]
      );
      setTotalCount(total);

      setHasMore(results.length + resultData.length < total);
    } catch (error) {
      console.error('데이터 로드 실패 : ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    setResults([]);
    setHasMore(true);
    fetchResults(searchQuery, 1);
  };

  const handleResultClick = (result) => {
    onConfirm({
      estateNumber: result.jurirno,
      companyName: result.bsnmCmpnm,
      ceoName: result.brkrNm,
      companyAddress: result.ldCodeNm,
    });
    close();
  };

  const onEnterKey = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchResults(searchQuery, page);
    }
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.6,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore, isLoading]);

  return (
    <Modal open={open} onCancel={handleClose} footer={null} width={600}>
      <h4 className={styles2.title}>중개사무소 조회</h4>
      <hr />
      <div className={styles.modalContent}>
        <div className={styles.searchWrap}>
          <input
            type="text"
            placeholder="상호명, 대표자명, 부동산중개등록번호로 조회 할 수 있습니다."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={onEnterKey}
            className={styles.searchInput}
          />
          <button className={styles.searchButton} onClick={handleSearch}>
            검색
          </button>
        </div>
      </div>
      <hr />
      <div className={styles.modalContent}>
        {isLoading && (
          <div>
            <Spin />
          </div>
        )}
        {results.map((result, index) => (
          <div
            key={index}
            className={styles.result}
            ref={index === results.length - 1 ? loadMoreRef : null}
            onClick={() => handleResultClick(result)}
          >
            <span>{result.jurirno}</span>
            <span>{result.bsnmCmpnm}</span>
            <span>{result.brkrNm}</span>
            <span hidden>{result.idCodeNm}</span>
          </div>
        ))}
        {!isLoading && results.length === 0 && (
          <div>조회 결과가 없습니다. </div>
        )}
      </div>
    </Modal>
  );
};
export default JoinModal;
