import './List.css';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, Suspense } from 'react';
import { url } from 'lib/axios';
import axios from 'axios';
import { useAtom, useAtomValue } from 'jotai';
import { userAtom } from 'store/atoms';
import useInfiniteScroll from 'hook/useInfiniteScroll';

const List = ({ loc, setLoc }) => {
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const [interiorList, setInteriorList] = useState([]);

  const [page, setPage] = useState(1); //새로고침시 업데이트된 데이트를 반영못해서 useState 대신 let으로 선언
  const [hasMore, setHasMore] = useState(true);
  const elementRef = useRef(null);
  const moveRegister = () => {
    navigate('/interiorRegister');
  };

  let vpage = 1;

  const onIntersection = (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      fetchMoreItems();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasMore]);

  useEffect(() => {
    // setPage(1);
    vpage = 1;
    setInteriorList([]);
    setHasMore(true);
    // fetchMoreItems();
  }, [loc]);

  const fetchMoreItems = async () => {
    await axios
      .get(`${url}/interiorList?possibleLocation=${loc}&page=${vpage}`)
      .then((res) => {
        const allPage = res.data.allPage;
        const resInteriorList = res.data.interiorList;

        if (vpage === allPage) {
          setHasMore(false);
        }
        vpage = vpage + 1;
        setInteriorList((interior) => [...interior, ...resInteriorList]);
      })
      .catch((error) => {
        console.error(error);
        setInteriorList([]);
      });
  };

  return (
    <div className="companyPage">
      <div className="topBar" style={{ marginBottom: '30px' }}>
        시공업체
        {!user.regStatus && user.type === 'interior' && (
          <button id="btn" onClick={moveRegister}>
            등록하기
          </button>
        )}
      </div>
      <Card interiorList={interiorList} />
      {hasMore && (
        <div ref={elementRef} style={{ textAlign: 'center' }}>
          Load More List
        </div>
      )}
    </div>
  );
};

export default List;
