import styles from './EstateDetail.module.scss'
import detailImg from '../../../assets/images/estateDetailImg.png'
import { FaUserCircle } from "react-icons/fa";

const EstateDetail = () => {

  return (
    <div className={styles.modalContainer}>
      <div className={styles.imgTextWrapper}>
        <div className={styles.detailImgWrapper}>
          <img src={detailImg} alt="매물상세 이미지"/>
        </div>
        <div className={styles.textWrapper}>
          <p>시골농가주택</p>
          <p>월세 300/33</p>
          <p>강원특별자치도 양구군 방산면 평화로 4801</p>
          <p>리모델링한 시골농가주택</p>
          <div className={styles.profileWrap}>
              <div className={styles.profile}>
                <FaUserCircle color="#6D885D" size={30} />
                <p>코스타 부동산</p>
              </div>
              <p>연락처 010-1234-5678</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default EstateDetail;