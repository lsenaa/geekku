import React, { useState, useEffect } from 'react';
import CommunityFilterBar from './CommunityFilterBar';
import CommunityList from './CommunityList';
import styles from './CommunityMain.module.css';
import axios from 'axios';
import { url } from 'lib/axios';

function CommunityMain() {
  const [communityList, setCommunityList] = useState([]);

  const [filters, setFilters] = useState({
    type: null,
    sizeRange: null,
    familyType: null,
    style: null,
    period: null,
    moneyRange: null,
  });
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);

  const size = 10;

  useEffect(() => {
    fetchData();
  }, [filters, page]);

  const fetchData = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${url}/communityListFiltered?page=${page}&size=${size}`,
        filters,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const newData = response.data.content;

      // 전체 개수 설정
      const total = response.data.totalElements;
      setTotalElements(total);

      if (page === 0) {
        // 필터 변경 후 첫 페이지 요청 시 기존 목록 대체
        setCommunityList(newData);
      } else {
        // 무한 스크롤 로딩 시 기존 목록에 추가
        setCommunityList((prev) => [...prev, ...newData]);
      }

      // 다음 페이지 존재 여부 판단
      setHasMore(!response.data.last);
    } catch (error) {
      console.error('데이터를 가져오는데 실패했습니다:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    // 필터가 변경되면 첫 페이지부터 다시 로딩
    setPage(0);
    setHasMore(true);
    setFilters(newFilters);
  };

  return (
    <div className={styles.app}>
      <CommunityFilterBar
        communityList={communityList}
        setCommunityList={setCommunityList}
        filters={filters}
        onFilterChange={handleFilterChange}
        totalElements={totalElements}
      />
      <CommunityList
        communityList={communityList}
        setCommunityList={setCommunityList}
        setPage={setPage}
        hasMore={hasMore}
        isLoading={isLoading}
      />
    </div>
  );
}

export default CommunityMain;
