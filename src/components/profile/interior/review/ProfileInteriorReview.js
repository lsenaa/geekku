import { useOutletContext } from 'react-router-dom';
import styles from './ProfileInteriorReview.module.scss';
import { useState } from 'react';
import Filter from 'components/commons/filter/Filter';
import { url } from 'lib/axios';
import { formatDate } from 'utils/utils';

const ProfileInteriorReview = () => {
  const { detailInfo } = useOutletContext();

  const [filterConditions, setFilterConditions] = useState({
    date: '',
    types: [],
    styles: [],
    sizes: [],
    location: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const elementRef = useRef(null);
  const itemsPerPage = 9; // 한 페이지당 보여줄 항목 수

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
  const filteredSamples = detailInfo.reviewDetail.filter((sample) => {
    const sampleSizeCategory = mapSizeToCategory(sample.size);
    return (
      (filterConditions.types.length > 0
        ? filterConditions.types.includes(sample.type)
        : true) &&
      (filterConditions.styles.length > 0
        ? filterConditions.styles.includes(sample.style)
        : true) &&
      (filterConditions.sizes.length > 0
        ? filterConditions.sizes.includes(sampleSizeCategory)
        : true) &&
      (filterConditions.location.length > 0
        ? filterConditions.location.includes(sample.location)
        : true)
    );
  });

  // 날짜 정렬
  const sortedDateSample = filteredSamples.sort((a, b) => {
    if (filterConditions.date === 'latest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (filterConditions.date === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
  });

  // 페이지네이션 처리
  const paginatedSamples = sortedDateSample.slice(
    0,
    currentPage * itemsPerPage
  );

  const fetchMoreItems = () => {
    if (paginatedSamples.length >= sortedDateSample.length) {
      setHasMore(false); // 더 가져올 항목이 없으면 false
      return;
    }
    setCurrentPage((prev) => prev + 1); // 페이지 증가
  };

  // 무한 스크롤 Intersection Observer
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
  }, [hasMore, sortedDateSample]);

  return (
    <div className={styles.container}>
      <h3>
        사용자 리뷰 <span>{sortedDateSample.length}</span>
      </h3>
      <ul className={styles.filter}>
        <Filter onFilter={handleFilter} />
      </ul>
      <ul className={styles.reviewWrap}>
        {paginatedSamples.map((review, i) => (
          <li key={i}>
            <div className={styles.userWrap}>
              <div className={styles.profileImg}>
                <img
                  src={
                    review.profileImage &&
                    `data:image/png;base64,${review.profileImage}`
                  }
                  alt="프로필 이미지"
                />
              </div>
              <p className={styles.username}>{review.name}</p>
              <p className={styles.createdAt}>{formatDate(review.createdAt)}</p>
            </div>
            <ul className={styles.optionWrap}>
              {review.date && <li>{review.date}</li>}
              {review.type && <li>{review.type}</li>}
              {review.style && <li>{review.style}</li>}
              {review.size && <li>{review.size}평</li>}
              {review.location && <li>{review.location}</li>}
            </ul>
            <div className={styles.reviewImgsWrap}>
              <div className={styles.imgWrap}>
                {review.imageNums.length !== 0 &&
                  review.imageNums.split(',').map((fn) => (
                    <img
                      key={fn}
                      src={`${url}/reviewImage/${fn}`}
                      alt="리뷰 이미지"
                      style={{
                        width: '124px',
                        height: '124px',
                        marginRight: '20px',
                      }}
                    />
                  ))}
              </div>
            </div>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
      <div ref={elementRef} />
    </div>
  );
};

export default ProfileInteriorReview;
