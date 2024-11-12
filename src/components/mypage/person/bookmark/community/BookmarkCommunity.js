import styles from './BookmarkCommunity.module.scss';
import { Link } from 'react-router-dom';
import interiorImg from 'assets/images/InteriorExam.jpg';
import bookmarkImg from 'assets/images/bookmarkTrue.png';
import { FaUserCircle } from 'react-icons/fa';

const BookmarkCommunity = () => {
  const bookmarkData = [
    {
      title: '신혼집 스타일링으로 꾸미며 수납은 넉넉하게!',
      username: 'test_유저1',
      userImg: '',
      image: interiorImg,
    },
    {
      title: '디자이너의 철학을 담아, 부드럽고 편안한 분위기의 인테리어',
      username: 'test_유저2',
      userImg: '',
      image: interiorImg,
    },
    {
      title: '🌕아이와 함께할 집, 수납이 필수이면서도 깔끔한 공간',
      username: 'test_유저3',
      userImg: '',
      image: interiorImg,
    },
  ];

  return (
    <ul className={styles.bookmarkContainer}>
      {bookmarkData.map((community, i) => (
        <li key={i}>
          <Link to={'#'}>
            <div className={styles.imgWrapper}>
              <img src={community.image} alt="집들이 이미지" />
            </div>
            <div className={styles.contentWrapper}>
              <p className={styles.title}>{community.title}</p>
              <div className={styles.bookmarkWrap}>
                <div className={styles.userWrap}>
                  <FaUserCircle color="#6D885D" size={30} />
                  <p>{community.username}</p>
                </div>
                <img src={bookmarkImg} alt="북마크 이미지" />
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BookmarkCommunity;
