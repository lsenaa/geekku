import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import styles from './ProfileInteriorSample.module.scss';
import Button01 from 'components/commons/button/Button01';
import Filter from 'components/commons/filter/Filter';
import { useEffect, useRef, useState } from 'react';
import { url } from 'lib/axios';
import { useAtomValue } from 'jotai';
import { userAtom } from 'store/atoms';

const ProfileInteriorSample = () => {
  const { detailInfo } = useOutletContext();
  const { interiorNum } = useOutletContext();
  const navigate = useNavigate();

  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterConditions, setFilterConditions] = useState({
    date: '',
    types: [],
    styles: [],
    sizes: [],
    location: [],
  });

  const elementRef = useRef(null);
  const itemsPerPage = 10; // 한 페이지당 보여줄 항목 수
  const user = useAtomValue(userAtom);

  // 필터 변경 핸들러
  const handleFilter = (newConditions) => {
    setFilterConditions(newConditions);
    setCurrentPage(1); // 필터 변경 시 페이지 초기화
    setHasMore(true);
  };

  // 크기 범위 매핑 함수
  const mapSizeToCategory = (size) => {
    const sizeNum = parseInt(size); // "20평" => 20
    if (sizeNum < 10) return '10평미만';
    if (sizeNum >= 10 && sizeNum < 20) return '10평대';
    if (sizeNum >= 20 && sizeNum < 30) return '20평대';
    if (sizeNum >= 30 && sizeNum < 40) return '30평대';
    if (sizeNum >= 40 && sizeNum < 50) return '40평대';
    if (sizeNum >= 50 && sizeNum < 60) return '50평대';
    return '50평대 이상';
  };

  // 필터링 로직
  const filteredSamples = detailInfo.sampleDetail.filter((sample) => {
    const sampleSizeCategory = mapSizeToCategory(sample.size);

    return (
      (filterConditions.types.length === 0 ||
        filterConditions.types.includes(sample.type)) &&
      (filterConditions.styles.length === 0 ||
        filterConditions.styles.includes(sample.style)) &&
      (filterConditions.sizes.length === 0 ||
        filterConditions.sizes.includes(sampleSizeCategory)) &&
      (filterConditions.location.length === 0 ||
        filterConditions.location.includes(sample.location))
    );
  });

  // 정렬 로직
  const sortedSamples = filteredSamples.sort((a, b) => {
    if (filterConditions.date === 'latest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (filterConditions.date === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
  });

  // 페이지네이션 처리
  const paginatedSamples = sortedSamples.slice(0, currentPage * itemsPerPage);

  // 더 가져올 데이터가 있는지 확인
  const fetchMoreItems = () => {
    if (paginatedSamples.length >= sortedSamples.length) {
      setHasMore(false);
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Intersection Observer 설정
  useEffect(() => {
    const onIntersection = (entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasMore) {
        fetchMoreItems();
      }
    };

    const observer = new IntersectionObserver(onIntersection);
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasMore, paginatedSamples]);

  return (
    <div className={styles.container}>
      <h3>
        시공사례 <span>{filteredSamples.length}</span>
      </h3>
      <div className={styles.filterBtnWrap}>
        <Filter onFilter={handleFilter} />
        {user.companyName === detailInfo.interiorDetail.companyName && (
          <Button01
            size="x-small"
            onClick={() => navigate('/sampleRegister', { state: interiorNum })}
          >
            등록하기
          </Button01>
        )}
      </div>
      <ul className={styles.sampleWrap}>
        {paginatedSamples.map((sample, index) => (
          <li key={index}>
            <Link to={`/sampleDetail/${sample.sampleNum}`}>
              <div className={styles.sampleImgWrap}>
                <img
                  src={`${url}/sampleImage/${sample.coverImage}`}
                  alt="시공사례 이미지"
                />
              </div>
              <div className={styles.textWrap}>
                <p>{sample.title}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {hasMore && <div ref={elementRef} style={{ height: '1px' }} />}{' '}
    </div>
  );
};

export default ProfileInteriorSample;
