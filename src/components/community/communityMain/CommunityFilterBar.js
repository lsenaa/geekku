import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './CommunityFilterBar.module.css';
import { url } from 'lib/axios';
import { userAtom } from 'store/atoms';
import { useAtomValue } from 'jotai';

const CommunityFilterBar = ({ communityList, setCommunityList }) => {
  const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState(0); // 전체 게시글 개수 상태 추가
  const user = useAtomValue(userAtom);
  const [filters, setFilters] = useState({
    housingType: null,
    roomCount: null,
    style: null,
    period: null,
    budget: null,
  });

  const [dropdownVisible, setDropdownVisible] = useState({
    housingType: false,
    roomCount: false,
    style: false,
  });

  // 커뮤니티글 작성 폼 이동
  const handleCommunityBoardWrite = () => {
    if ((user && user.userId) || user.companyId) {
      navigate('/CommunityBoardWrite');
    } else {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(`${url}/communityList2`, filters, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setCommunityList(response.data.content);
      setTotalCount(response.data.content.length);
    } catch (error) {
      console.error('데이터를 가져오는데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      housingType: null,
      roomCount: null,
      style: null,
      period: null,
      budget: null,
    });
  };

  const toggleDropdown = (key) => {
    setDropdownVisible((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterBar}>
        <h2 className={styles.boardTitle}>집들이 게시판</h2>

        <div
          className={styles.filterButtonWrapper}
          onMouseEnter={() => toggleDropdown('housingType')}
          onMouseLeave={() => toggleDropdown('housingType')}
        >
          <button className={styles.filterButton}>주거 형태</button>
          {dropdownVisible.housingType && (
            <div className={styles.dropdown}>
              <div onClick={() => handleFilterChange('housingType', '아파트')}>
                아파트
              </div>
              <div onClick={() => handleFilterChange('housingType', '빌라')}>
                빌라
              </div>
              <div
                onClick={() => handleFilterChange('housingType', '단독주택')}
              >
                단독주택
              </div>
              <div onClick={() => handleFilterChange('housingType', '기타')}>
                기타
              </div>
            </div>
          )}
        </div>

        <div
          className={styles.filterButtonWrapper}
          onMouseEnter={() => toggleDropdown('roomCount')}
          onMouseLeave={() => toggleDropdown('roomCount')}
        >
          <button className={styles.filterButton}>방수</button>
          {dropdownVisible.roomCount && (
            <div className={styles.dropdown}>
              <div onClick={() => handleFilterChange('roomCount', 1)}>1개</div>
              <div onClick={() => handleFilterChange('roomCount', 2)}>2개</div>
              <div onClick={() => handleFilterChange('roomCount', 3)}>3개</div>
            </div>
          )}
        </div>

        <div
          className={styles.filterButtonWrapper}
          onMouseEnter={() => toggleDropdown('style')}
          onMouseLeave={() => toggleDropdown('style')}
        >
          <button className={styles.filterButton}>스타일</button>
          {dropdownVisible.style && (
            <div className={styles.dropdown}>
              <div onClick={() => handleFilterChange('style', '모던')}>
                모던
              </div>
              <div onClick={() => handleFilterChange('style', '빈티지')}>
                빈티지
              </div>
              <div onClick={() => handleFilterChange('style', '북유럽')}>
                북유럽
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.selectedFilters}>
        {Object.entries(filters).map(([key, value]) =>
          value ? (
            <span key={key} className={styles.filterTag}>
              {value}{' '}
              <button
                onClick={() => handleFilterChange(key, null)}
                className={styles.filterRemoveButton}
              >
                X
              </button>
            </span>
          ) : null
        )}
        <button onClick={resetFilters} className={styles.resetButton}>
          초기화
        </button>
      </div>

      <div className={styles.filterHeader}>
        <span className={styles.totalCount}>전체 {totalCount}</span>
        <button
          className={styles.registerButton}
          onClick={handleCommunityBoardWrite}
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default CommunityFilterBar;
