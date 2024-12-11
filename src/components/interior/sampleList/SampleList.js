import Filter from 'components/commons/filter/Filter';
import styles from './Sample.module.scss';
import Card from './Card';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios, { all } from 'axios';
import { url } from 'lib/axios';
import qs from 'qs';
import { useAtomValue } from 'jotai';
import { userAtom } from 'store/atoms';
import TopButton from 'components/layout/topbutton/TopButton';

const SampleList = () => {
  const user = useAtomValue(userAtom);
  const [sampleList, setSampleList] = useState([]);
  const [filteredSamples, setFilteredSamples] = useState([]);
  const navigate = useNavigate();
  const [filterConditions, setFilterConditions] = useState({
    date: '',
    types: [],
    styles: [],
    sizes: [],
    location: [],
  });

  const [hasMore, setHasMore] = useState(true);
  const elementRef = useRef(null);
  let vpage = 1;

  const onInterserction = (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      fetchMoreItems();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onInterserction);
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
    vpage = 1;
    setSampleList([]);
    setHasMore(true);
    // fetchMoreItems();
  }, [filterConditions]);

  const handleFilter = (newConditions) => {
    setFilterConditions(newConditions);
  };

  const moveRegister = () => {
    navigate('/sampleRegister');
  };

  const fetchMoreItems = async () => {
    await axios
      .get(`${url}/sampleList?page=${vpage}`, {
        params: {
          date: filterConditions.date,
          types: filterConditions.types,
          styles: filterConditions.styles,
          sizes: filterConditions.sizes,
          location: filterConditions.location,
          // filterConditions  객체타입으로 받으면 그안에 정보를 명시해줘야 반영, 객체로 파라미터를 주면 필터 적용x
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'comma' });
        },
      })
      .then((res) => {
        const allPage = res.data.allPage;
        console.log('00000' + res.data);
        console.log(res.data.sampleList);
        console.log('1111111101111' + filterConditions.location);
        if (Array.isArray(res.data.sampleList)) {
          if (vpage === allPage) {
            setHasMore(false);
          }
          vpage = vpage + 1;
          setSampleList((sample) => [...sample, ...res.data.sampleList]);
        } else {
          console.error(res.data);
          setSampleList([]);
        }
      })
      .catch((error) => {
        console.error(error);
        setSampleList([]);
      });
  };

  return (
    <div className={styles.all}>
      <p className={styles.title}>시공사례</p>
      <div className={styles.midBar}>
        <Filter onFilter={handleFilter} />
        {user.type === 'interior' && (
          <button id={styles.regBtn} onClick={moveRegister}>
            등록하기
          </button>
        )}
      </div>
      <div className={styles.cardList}>
        <Card sampleList={sampleList} />
        {hasMore && (
          <div ref={elementRef} style={{ textAlign: 'center' }}>
            Load More List
          </div>
        )}
      </div>
      <TopButton />
    </div>
  );
};

export default SampleList;
