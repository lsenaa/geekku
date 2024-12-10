import styles from './Main.module.scss';
import { IoSearch } from 'react-icons/io5';
import { CiLocationOn } from 'react-icons/ci';
import { IoIosArrowForward } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatEstateType, formatPrice, searchByKeyword } from 'utils/utils';
import axios from 'axios';
import { url } from 'lib/axios';

const Main = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [estateList, setEstateList] = useState([]);
  const [communityList, setCommunityList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${url}/listForMain`)
      .then((res) => {
        setEstateList(res.data.estateList);
        setCommunityList(res.data.communityList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const searchResults = searchByKeyword(keyword);

  // 키워드 클릭시 매물 리스트로 이동
  const onClickKeyword = (keyword) => {
    navigate('/estate', { state: { keyword } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1>지방을 꾸미자</h1>
        <div className={styles.searchWrapper}>
          <IoSearch size={24} />
          <input
            type="text"
            placeholder="매물 지역을 검색해주세요."
            value={keyword}
            onChange={handleKeyword}
            maxLength={38}
          />
          {keyword !== '' && searchResults.length !== 0 && (
            <ul className={styles.searchList}>
              {searchResults.map((search, i) => (
                <li key={i} onClick={() => onClickKeyword(search)}>
                  <CiLocationOn size="20" />
                  <p>{search}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 최신 매물 리스트 */}
      <section className={styles.estateWrapper}>
        <h2>최신 매물 리스트</h2>
        <div className={styles.more}>
          <Link to={'/estate'}>
            더 많은 매물 보기
            <IoIosArrowForward />
          </Link>
        </div>
        <ul>
          {estateList.map((estate) => (
            <li key={estate.estateNum}>
              <Link to={'/estate'} state={{ keyword: estate.jibunAddress }}>
                <div className={styles.imgWrapper}>
                  <img
                    src={
                      estate.estateImageNums &&
                      `${url}/estateImage/${estate.estateImageNums.split(',')[0]}`
                    }
                    alt="집꾸 리스트 이미지"
                  />
                </div>
                <div className={styles.textWrapper}>
                  <p className={styles.type}>{formatEstateType(estate.type)}</p>
                  <p className={styles.price}>
                    {formatPrice({
                      jeonsePrice: estate.jeonsePrice,
                      monthlyPrice: estate.monthlyPrice,
                      depositPrice: estate.depositPrice,
                      buyPrice: estate.buyPrice,
                    })}
                  </p>
                  <div className={styles.locSizeWrapper}>
                    <p>{estate.jibunAddress}</p>
                    <p>
                      {estate.size2}㎡({estate.size1}평)
                    </p>
                  </div>
                  <p>{estate.title}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 집들이 베스트 리스트 */}
      <section className={styles.estateWrapper}>
        <h2>집들이 베스트 리스트</h2>
        <div className={styles.more}>
          <Link to={'/community'}>
            더 많은 집들이 보기
            <IoIosArrowForward />
          </Link>
        </div>
        <ul>
          {communityList.map((community) => (
            <li key={community.communityNum}>
              <Link to={`/communityBoardDetail/${community.communityNum}`}>
                <div className={styles.imgWrapper}>
                  <img
                    src={`${url}/communityImage/${community.coverImage}`}
                    alt="집들이 이미지"
                  />
                </div>
                <div className={styles.textWrapper}>
                  <p className={styles.communityTitle}>{community.title}</p>
                  <div className={styles.profileViewWrap}>
                    <div className={styles.profile}>
                      <div className={styles.profileImg}>
                        <img
                          src={`data:image/png;base64, ${community.profileImage}`}
                        />
                      </div>
                      <p>
                        {community.nickname
                          ? community.nickname
                          : community.name}
                      </p>
                    </div>
                    <p className={styles.viewCount}>
                      조회 {community.viewCount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Main;
