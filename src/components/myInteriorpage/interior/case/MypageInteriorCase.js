import styles from './MypageInteriorCase.module.scss';
import { Link } from 'react-router-dom';
import interiorImg from 'assets/images/InteriorExam.jpg';
import Button01 from 'components/commons/button/Button01';

const MypageInteriorCase = () => {
  const communityData = [
    {
      title: '신혼집 스타일링으로 꾸미며 수납은 넉넉하게!',
      viewCount: 1059,
      image: interiorImg,
    },
    {
      title: '디자이너의 철학을 담아, 부드럽고 편안한 분위기의 인테리어',
      viewCount: 994,
      image: interiorImg,
    },
    {
      title: '🌕아이와 함께할 집, 수납이 필수이면서도 깔끔한 공간',
      viewCount: 2039,
      image: interiorImg,
    },
  ];

  return (
    <ul className={styles.Container}>
      {communityData.map((community, i) => (
        <li key={i}>
          <Link to={'#'}>
            <div className={styles.imgWrapper}>
              <img src={community.image} alt="집들이 이미지" />
            </div>
            <div className={styles.textWrapper}>
              <p className={styles.title}>{community.title}</p>
              <p className={styles.view}>
                조회수 {community.viewCount.toLocaleString()}
              </p>
            </div>
            <div className={styles.contentWrapper}>
              <Button01 size="x-small" color="sub">
                상세보기
              </Button01>
              <br />
              <br />
              <Button01 size="x-small">삭제</Button01>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MypageInteriorCase;
