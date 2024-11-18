import { Link } from 'react-router-dom';
import styles from './ProfileInteriorSample.module.scss';
import sampleImg from 'assets/images/interiorEx.png';
import Button01 from 'components/commons/button/Button01';

const ProfileInteriorSample = () => {
  const sampleData = [
    {
      title: '당산 삼성 래미안 4차 58평형 모던브라운 인테리어',
      image: sampleImg,
    },
    {
      title: 'TV없는 집: 호텔의 느낌을 입히다.',
      image: sampleImg,
    },
    {
      title: "'7가지' 벽지가 들어간 네이비톤 하우스",
      image: sampleImg,
    },
    {
      title: '나에게 맞는 주방은 이렇게 만들어야 합니다.',
      image: sampleImg,
    },
    {
      title: '현관 방향을 바꾸고 기본에 충실한 모던 디자인 예시',
      image: sampleImg,
    },
    {
      title:
        '2bay 구축의 단점을 극복하고, 화이트 톤의 깔끔한 인테리어로 리모델링',
      image: sampleImg,
    },
  ];
  return (
    <div className={styles.container}>
      <h3>
        시공사례 <span>26</span>
      </h3>
      <div className={styles.filterBtnWrap}>
        <ul className={styles.filter}>
          <li>정렬</li>
          <li>주거형태</li>
          <li>스타일</li>
          <li>평수</li>
          <li>지역</li>
        </ul>
        <Button01 size="x-small">등록하기</Button01>
      </div>
      <ul className={styles.sampleWrap}>
        {sampleData.map((sample, i) => (
          <li key={i}>
            <Link to={'/'}>
              <div className={styles.sampleImgWrap}>
                <img src={sample.image} alt="시공사례 이미지" />
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
