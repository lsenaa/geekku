import { Link } from 'react-router-dom';
import styles from './ProfileInteriorReview.module.scss';
import sampleImg from 'assets/images/interiorEx.png';
import Button01 from 'components/commons/button/Button01';
import { FaUserCircle } from 'react-icons/fa';

const ProfileInteriorReview = () => {
  const reviewData = [
    {
      username: '리케리',
      content:
        '여러곳에 인테리어 문의후 고민끝에 결정했는데 그 결정이유가 견적보러오셨을때 다른곳과 다른접근방법으로 신박하게 접근해주시고 저희가 보지못한곳까지 제안해주셔서 선택하게 되었어요 그이후에도 벽지,타일,색등등 고를때 설명도 쉽게잘해주시고 친절하게대해주셔서 참 좋았습니다. 이것저것 부탁드렸었는데 흔쾌히 수락해주시고 특히 캣워크도 설치도 부탁드렸는데 이쁘고 튼튼히 설치해주셔서 아주 좋았습니다 현재 인테리어한지 수개월이 지났지만 불만없구요 작은 A/S 도 잘처리해주시고 아주만족하면서 살고있습니다 감사합니다!!',
      image: sampleImg,
      createdAt: '2024.10.27',
      interiorDate: '2024.09',
      type: '농가주택',
      style: '우드',
      size: '58평',
      location: '강원도',
    },
    {
      username: '집돌이두스',
      content:
        '처음 상담부터 친절하셨고, 깔끔하셨어요. 예산이 한정적이어서 예산 관련된 부분 합리적으로 조율해주셨습니다. 1개월 정도 지났는데 현재까지 하자는 없었습니다. 만족합니다!',
      image: sampleImg,
      createdAt: '2024.10.27',
      interiorDate: '2024.09',
      type: '농가주택',
      style: '우드',
      size: '58평',
      location: '강원도',
    },
  ];

  return (
    <div className={styles.container}>
      <h3>
        사용자 리뷰 <span>10</span>
      </h3>
      <ul className={styles.filter}>
        <li>정렬</li>
        <li>주거형태</li>
        <li>스타일</li>
        <li>평수</li>
        <li>지역</li>
      </ul>
      <ul className={styles.reviewWrap}>
        {reviewData.map((review, i) => (
          <li key={i}>
            <div className={styles.userWrap}>
              <FaUserCircle color="#6D885D" size={40} />
              <p className={styles.username}>{review.username}</p>
              <p className={styles.createdAt}>{review.createdAt}</p>
            </div>
            <ul className={styles.optionWrap}>
              <li>{review.interiorDate}</li>
              <li>{review.type}</li>
              <li>{review.style}</li>
              <li>{review.size}</li>
              <li>{review.location}</li>
            </ul>
            <div className={styles.reviewImgsWrap}>
              <div className={styles.imgWrap}>
                <img src={review.image} alt="리뷰 이미지" />
              </div>
              <div className={styles.imgWrap}>
                <img src={review.image} alt="리뷰 이미지" />
              </div>
              <div className={styles.imgWrap}>
                <img src={review.image} alt="리뷰 이미지" />
              </div>
              <div className={styles.imgWrap}>
                <img src={review.image} alt="리뷰 이미지" />
              </div>
              <div className={styles.imgWrap}>
                <img src={review.image} alt="리뷰 이미지" />
              </div>
              <div className={styles.imgWrap}>
                <img src={review.image} alt="리뷰 이미지" />
              </div>
            </div>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileInteriorReview;
