import { Link, useOutletContext } from 'react-router-dom';
import styles from './ProfileInteriorSample.module.scss';
import sampleImg from 'assets/images/interiorEx.png';
import Button01 from 'components/commons/button/Button01';
import Filter from 'components/commons/filter/Filter';
import { useState } from 'react';

const ProfileInteriorSample = () => {
  const { detailInfo } = useOutletContext();

  const [filterConditions, setFilterConditions] = useState({
    date: '',
    types: [],
    styles: [],
    sizes: [],
    location: [],
  });

  const handleFilter = (newConditions) => {
    setFilterConditions(newConditions);
  };
  const filteredSamples = detailInfo.sampleDetail.filter((sample) => {
    return (
      (filterConditions.date ? true : true) &&
      (filterConditions.types.length > 0
        ? filterConditions.types.includes(sample.type)
        : true) &&
      (filterConditions.styles.length > 0
        ? filterConditions.styles.includes(sample.style)
        : true) &&
      (filterConditions.sizes.length > 0
        ? filterConditions.sizes.includes(sample.size)
        : true) &&
      (filterConditions.location.length > 0
        ? filterConditions.location.includes(sample.location)
        : true)
    );
  });

  const sortedDateSample = filteredSamples.sort((a, b) => {
    if (filterConditions.date === 'latest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (filterConditions.date === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
  });

  //필터된 사례 수로 시공사례옆에 보여주고싶으면 {filteredSamples.length}로 변경
  //사례 전체 보여줄거면 {detailInfo.sampleCount}
  return (
    <div className={styles.container}>
      <h3>
        시공사례 <span>{sortedDateSample.length}</span>
      </h3>
      <div className={styles.filterBtnWrap}>
        {/* <ul className={styles.filter}>
          <li>정렬</li>
          <li>주거형태</li>
          <li>스타일</li>
          <li>평수</li>
          <li>지역</li>
        </ul> */}
        <Filter onFilter={handleFilter} />
        <Button01 size="x-small">등록하기</Button01>
      </div>
      <ul className={styles.sampleWrap}>
        {sortedDateSample.map((sample, i) => (
          <li key={i}>
            <Link to={'/'}>
              <div className={styles.sampleImgWrap}>
                <img src={sample.coverImage} alt="시공사례 이미지" />
              </div>
              <div className={styles.textWrap}>
                <p>{sample.title}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileInteriorSample;
