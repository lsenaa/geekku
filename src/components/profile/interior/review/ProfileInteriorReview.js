import { Link, useOutletContext } from 'react-router-dom';
import styles from './ProfileInteriorReview.module.scss';
import sampleImg from 'assets/images/interiorEx.png';
import Button01 from 'components/commons/button/Button01';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import Filter from 'components/commons/filter/Filter';
import { url } from 'lib/axios';
import { formatDate } from 'utils/utils';
import TopButton from 'components/layout/topbutton/TopButton';

const ProfileInteriorReview = () => {
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

  const filteredSamples = detailInfo.reviewDetail.filter((sample) => {
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

  console.log(sortedDateSample);

  return (
    <div className={styles.container}>
      <h3>
        사용자 리뷰 <span>{sortedDateSample.length}</span>
      </h3>
      <ul className={styles.filter}>
        <Filter onFilter={handleFilter} />
      </ul>
      <ul className={styles.reviewWrap}>
        {sortedDateSample.map((review, i) => (
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
              {review.interiorDate && <li>{review.interiorDate}</li>}
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
      <TopButton />
    </div>
  );
};

export default ProfileInteriorReview;
