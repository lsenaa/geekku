import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './CommunityFilterBar.module.css';
import { url } from 'lib/axios';
import { userAtom } from 'store/atoms';
import { useAtomValue } from 'jotai';

const CommunityFilterBar = ({ communityList, setCommunityList }) => {
  const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState(0);
  const user = useAtomValue(userAtom);

  const [filters, setFilters] = useState({
    type: null,
    sizeRange: null,
    familyType: null,
    style: null,
    period: null,
    moneyRange: null,
  });

  const [dropdownVisible, setDropdownVisible] = useState({
    type: false,
    sizeRange: false,
    familyType: false,
    style: false,
    period: false,
    moneyRange: false,
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
      type: null,
      sizeRange: null,
      familyType: null,
      style: null,
      period: null,
      moneyRange: null,
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

        {/* 주거 형태 필터 */}
        <div
          className={styles.filterButtonWrapper}
          onMouseEnter={() => toggleDropdown('type')}
          onMouseLeave={() => toggleDropdown('type')}
        >
          <button className={styles.filterButton}>주거 형태</button>
          {dropdownVisible.type && (
            <div className={styles.dropdown}>
              <div onClick={() => handleFilterChange('type', '아파트/빌라')}>
                아파트/빌라
              </div>
              <div onClick={() => handleFilterChange('type', '시골 농가 주택')}>
                시골 농가 주택
              </div>
              <div onClick={() => handleFilterChange('type', '전원 주택')}>
                전원 주택
              </div>
              <div onClick={() => handleFilterChange('type', '농장 토지')}>
                농장 토지
              </div>
            </div>
          )}
        </div>

        {/* 평수 필터 */}
        {/* <div
          className={styles.filterButtonWrapper}
          onMouseEnter={() => toggleDropdown('sizeRange')}
          onMouseLeave={() => toggleDropdown('sizeRange')}
        >
          <button className={styles.filterButton}>평수</button>
          {dropdownVisible.sizeRange && (
            <div className={styles.dropdown}>
              <div onClick={() => handleFilterChange('sizeRange', '0-20')}>
                0평 ~ 20평
              </div>
              <div onClick={() => handleFilterChange('sizeRange', '21-40')}>
                21평 ~ 40평
              </div>
              <div onClick={() => handleFilterChange('sizeRange', '41-60')}>
                41평 ~ 60평
              </div>
              <div onClick={() => handleFilterChange('sizeRange', '61+')}>
                61평 이상
              </div>
            </div>
          )}
        </div> */}

        {/* 가족 형태 필터 */}
        {/* <div
          className={styles.filterButtonWrapper}
          onMouseEnter={() => toggleDropdown('familyType')}
          onMouseLeave={() => toggleDropdown('familyType')}
        >
          <button className={styles.filterButton}>가족 형태</button>
          {dropdownVisible.familyType && (
            <div className={styles.dropdown}>
              <div
                onClick={() => handleFilterChange('familyType', '싱글라이프')}
              >
                싱글라이프
              </div>
              <div onClick={() => handleFilterChange('familyType', '신혼부부')}>
                신혼부부
              </div>
              <div
                onClick={() =>
                  handleFilterChange('familyType', '아기가 있는 집')
                }
              >
                아기가 있는 집
              </div>
              <div
                onClick={() =>
                  handleFilterChange('familyType', '취학 자녀가 있는 집')
                }
              >
                취학 자녀가 있는 집
              </div>
              <div
                onClick={() =>
                  handleFilterChange('familyType', '부모님과 함께 사는 집')
                }
              >
                부모님과 함께 사는 집
              </div>
            </div>
          )}
        </div> */}

        {/* 스타일 필터 */}
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
              <div onClick={() => handleFilterChange('style', '미니멀&심플')}>
                미니멀&심플
              </div>
              <div onClick={() => handleFilterChange('style', '내추럴')}>
                내추럴
              </div>
              <div onClick={() => handleFilterChange('style', '북유럽')}>
                북유럽
              </div>
              <div onClick={() => handleFilterChange('style', '빈티지&레트로')}>
                빈티지&레트로
              </div>
              <div onClick={() => handleFilterChange('style', '클래식&앤틱')}>
                클래식&앤틱
              </div>
              <div
                onClick={() => handleFilterChange('style', '프랜치&프로방스')}
              >
                프랜치&프로방스
              </div>
              <div onClick={() => handleFilterChange('style', '러블리&로맨틱')}>
                러블리&로맨틱
              </div>
              <div onClick={() => handleFilterChange('style', '인더스트리얼')}>
                인더스트리얼
              </div>
              <div onClick={() => handleFilterChange('style', '한국&아시아')}>
                한국&아시아
              </div>
              <div
                onClick={() => handleFilterChange('style', '유니크&믹스매치')}
              >
                유니크&믹스매치
              </div>
            </div>
          )}
        </div>

        {/* 기간 필터 */}
        {/* <div
          className={styles.filterButtonWrapper}
          onMouseEnter={() => toggleDropdown('period')}
          onMouseLeave={() => toggleDropdown('period')}
        >
          <button className={styles.filterButton}>기간</button>
          {dropdownVisible.period && (
            <div className={styles.dropdown}>
              <div onClick={() => handleFilterChange('period', '1개월')}>
                최근 1개월
              </div>
              <div onClick={() => handleFilterChange('period', '3개월')}>
                최근 3개월
              </div>
              <div onClick={() => handleFilterChange('period', '6개월')}>
                최근 6개월
              </div>
            </div>
          )}
        </div> */}

        {/* 예산 필터 */}
        {/* <div
          className={styles.filterButtonWrapper}
          onMouseEnter={() => toggleDropdown('moneyRange')}
          onMouseLeave={() => toggleDropdown('moneyRange')}
        >
          <button className={styles.filterButton}>예산</button>
          {dropdownVisible.moneyRange && (
            <div className={styles.dropdown}>
              <div onClick={() => handleFilterChange('moneyRange', '0-1000')}>
                ~1000만원
              </div>
              <div
                onClick={() => handleFilterChange('moneyRange', '1001-3000')}
              >
                1001만원 ~ 3000만원
              </div>
              <div
                onClick={() => handleFilterChange('moneyRange', '3001-5000')}
              >
                3001만원 ~ 5000만원
              </div>
              <div onClick={() => handleFilterChange('moneyRange', '5001+')}>
                5001만원 이상
              </div>
            </div>
          )}
        </div> */}
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
