import styles from './Main.module.scss';
import { IoSearch } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import esateImg01 from "../../assets/images/estate01.png";
import esateImg02 from "../../assets/images/estate02.png";
import esateImg03 from "../../assets/images/estate03.png";
import { Link } from 'react-router-dom';

const Main = () => {
  const estateData = [
    {type: "전원주택", price: "월세 300/33", location: "충청남도 태안군", size: "109㎡ (30평)", title: "시골 빈집 전원주택", image: esateImg01},
    {type: "아파트", price: "월세 500/43", location: "경상북도 예천군", size: "109㎡ (30평)", title: "깔끔하게 리모델링한 아파트", image: esateImg02},
    {type: "시골농가주택", price: "월세 100/33", location: "충청북도 단양군", size: "109㎡ (30평)", title: "리모델링한 시골농가주택", image: esateImg03},
  ]

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1>지방을 꾸미자</h1>
        <div className={styles.searchWrapper}>
          <IoSearch size={24}/>
          <input type="text" placeholder="매물 지역을 검색해주세요." />
        </div>
      </div>
      
      {/* 최신 매물 리스트 */}
      <section className={styles.estateWrapper}>
        <h2>최신 매물 리스트</h2>
        <div className={styles.more}>
          <Link to={"/"}>
          더 많은 매물 보기
            <IoIosArrowForward />
          </Link> 
        </div>
        <ul>
          {estateData.map((estate, i) => (
            <li key={i}>
              <Link to={"/"}>
                <div className={styles.imgWrapper}>
                  <img src={estate.image} alt="집꾸 리스트 이미지" />
                </div>
                <div className={styles.textWrapper}>
                  <p className={styles.type}>{estate.type}</p>
                  <p className={styles.price}>{estate.price}</p>
                  <div className={styles.locSizeWrapper}>
                    <p>{estate.location}</p>
                    <p>{estate.size}</p>
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
          <Link to={"/"}>
            더 많은 집들이 보기
            <IoIosArrowForward />
          </Link> 
        </div>
        <ul>
          <li>
            <Link to={"/"}>
              <div className={styles.imgWrapper}>
                <img src={esateImg01} alt="집꾸 리스트 이미지" />
              </div>
              <div className={styles.textWrapper}>
                <p className={styles.communityTitle}>아빠와 딸이 함께 사는 전원주택, 내추럴 무드 그대로 그대로그대로</p>
                <div className={styles.profileViewWrap}>
                  <div className={styles.profile}>
                    <FaUserCircle color="#6D885D" size={30} />
                    <p>test_유저1</p>
                  </div>
                  <p>조회 1,059</p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to={"/"}>
              <div className={styles.imgWrapper}>
                <img src={esateImg01} alt="집꾸 리스트 이미지" />
              </div>
              <div className={styles.textWrapper}>
                <p className={styles.communityTitle}>아빠와 딸이 함께 사는 전원주택, 내추럴 무드 그대로 그대로그대로</p>
                <div className={styles.profileViewWrap}>
                  <div className={styles.profile}>
                    <FaUserCircle color="#6D885D" size={30} />
                    <p>test_유저1</p>
                  </div>
                  <p>조회 1,059</p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to={"/"}>
              <div className={styles.imgWrapper}>
                <img src={esateImg01} alt="집꾸 리스트 이미지" />
              </div>
              <div className={styles.textWrapper}>
                <p className={styles.communityTitle}>아빠와 딸이 함께 사는 전원주택, 내추럴 무드 그대로 그대로그대로</p>
                <div className={styles.profileViewWrap}>
                  <div className={styles.profile}>
                    <FaUserCircle color="#6D885D" size={30} />
                    <p>test_유저1</p>
                  </div>
                  <p>조회 1,059</p>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default Main;