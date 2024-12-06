import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MypageEstateCardList from './MypageEstateCardList';
import styles from './MypageEstate.module.css';
import { userAtom, tokenAtom } from 'store/atoms';
import { useAtomValue } from 'jotai';
import { axiosInToken, url } from 'lib/axios';

const MypageEstate = () => {
  const [estateList, setEstateList] = useState([]);
  const [curPage, setCurPage] = useState(0);
  const [allPage, setAllPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터가 있는지 여부
  const user = useAtomValue(userAtom); // 현재 로그인된 사용자 정보
  const token = useAtomValue(tokenAtom);
  const [isFetching, setIsFetching] = useState(false); // 현재 데이터 요청 중인지 확인
  let wait = false;

  // 서버에서 데이터 가져오기
  const fetchEstateData = async (page) => {
    const companyId = user.companyId;
    try {
      const response = await axiosInToken(token).get(
        `${url}/company/mypageEstateList?page=${page}&companyId=${companyId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setEstateList([...estateList, ...response.data.estateList]);
      setCurPage(response.data.pageInfo.curPage);
      setAllPage(response.data.pageInfo.allPage);
      wait = false;
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
      wait = false;
    }
  };

  // 스크롤 이벤트 감지
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.offsetHeight
    ) {
      fetchEstateData(curPage + 1); // 다음 페이지 데이터를 요청
    }
  };

  // **리스트에서 항목 제거**
  const removeEstateFromList = (estateNum) => {
    setEstateList((prevList) =>
      prevList.filter((estate) => estate.estateNum !== estateNum)
    );
  };
  useEffect(() => {
    fetchEstateData(curPage + 1); // 초기 데이터 로드
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // 이벤트 제거
  }, [curPage, allPage, isFetching]); // 의존성 추가

  return (
    <div className={styles.container}>
      <MypageEstateCardList
        estateList={estateList}
        onDelete={removeEstateFromList} // 삭제 콜백 함수 전달
      />
      {isLoading && <p>로딩 중...</p>}
      {!hasMore && <p>모든 데이터를 불러왔습니다.</p>}
    </div>
  );
};

export default MypageEstate;
