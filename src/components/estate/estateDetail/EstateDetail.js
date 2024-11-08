import styles from './EstateDetail.module.scss'
import detailImg from '../../../assets/images/estateDetailImg.png'
import bookmarkFalseImg from '../../../assets/images/bookmarkFalse.png'
import { FaUserCircle } from "react-icons/fa";
import Button01 from '../../button/Button01';

const EstateDetail = () => {

  return (
    <div className={styles.modalContainer}>
      <div className={styles.imgTextWrapper}>
        <div className={styles.detailImgWrapper}>
          <img src={detailImg} alt="매물상세 이미지" />
        </div>
        <div className={styles.textWrapper}>
          <p>시골농가주택</p>
          <p className={styles.price}>월세 300/33</p>
          <p>강원특별자치도 양구군 방산면 평화로 4801</p>
          <p>리모델링한 시골농가주택</p>
          <div className={styles.profileWrapper}>
              <div className={styles.profile}>
                <FaUserCircle color="#6D885D" size={30} />
                <p>코스타 부동산</p>
              </div>
              <p>|&nbsp; 연락처 010-1234-5678</p>
          </div>
          <div className={styles.btnWrapper}>
            <img src={bookmarkFalseImg} alt="북마크 이미지" />
            {/* <button>문의하기</button> */}
            <Button01 size="medium">문의하기</Button01>
          </div>
        </div>
      </div>

      <table className={styles.table}>
        <tr>
          <td className={styles.title}>보증금/월세</td>
          <td>300/33(만원)</td>
          <td className={styles.title}>관리비</td>
          <td>13만원</td>
        </tr>
        <tr>
          <td className={styles.title}>층수(건물층)</td>
          <td>1층(1층)</td>
          <td className={styles.title}>전용/공급면적</td>
          <td>103㎡/103㎡</td>
        </tr>
      </table>
    </div>
  )
}

export default EstateDetail;