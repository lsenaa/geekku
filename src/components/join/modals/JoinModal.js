import { Modal, Spin } from 'antd';
import { useState } from 'react';
import { url } from 'lib/axios';
import axios from 'axios';
import styles from '../modals/JoinModal.module.scss';
import styles2 from '../Join.module.scss';

const JoinModal = ({ open, close, onConfirm }) => {
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태
  const [results, setResults] = useState([]); // 조회 결과 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const params = {};

      if (searchQuery.includes('-')) {
        params.jurirno = searchQuery;
      } else if (isNaN(searchQuery)) {
        params.brkrNm = searchQuery;
      } else {
        params.bsnmCmpnm = searchQuery;
      }

      const response = await axios.get(`${url}/searchEstate`, { params });
      //console.log('백엔드 응답 데이터 : ', response.data);

      const resultData = response.data?.EDBrokers?.field || [];
      if (!Array.isArray(resultData) || resultData.length === 0) {
        Modal.error({
          content: '조회 결과가 없습니다.',
        });
        setResults([]);
        return;
      }

      setResults(resultData);
    } catch (error) {
      //console.error('조회 실패 : ', error);
      setResults([]);
      Modal.error({
        content: '조회에 실패했습니다. 다시 시도해주세요.',
      });
    } finally {
      setIsLoading(false);
    }
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

  return (
    <Modal open={open} onCancel={close} footer={null} width={600}>
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
        {isLoading ? (
          <div>
            <Spin />
          </div>
        ) : results.length > 0 ? (
          results.map((result, index) => (
            <div
              key={index}
              className={styles.result}
              onClick={() => handleResultClick(result)}
            >
              <span>{result.jurirno}</span>
              <span>{result.bsnmCmpnm}</span>
              <span>{result.brkrNm}</span>
              <span hidden>{result.idCodeNm}</span>
            </div>
          ))
        ) : (
          <div>조회 결과가 없습니다. </div>
        )}
      </div>
    </Modal>
  );
};
export default JoinModal;
