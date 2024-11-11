import styles from "./EstateDetail.module.scss";
import detailImg from "../../../assets/images/estateDetailImg.png";
import bookmarkFalseImg from "../../../assets/images/bookmarkFalse.png";
import bookmarkTrueImg from "../../../assets/images/bookmarkTrue.png";
import { FaUserCircle } from "react-icons/fa";
import Button01 from "../../commons/button/Button01";
import { useState } from "react";
import { Carousel } from "antd";

const EstateDetail = () => {
  const [bookmark, setBookmark] = useState(false);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.imgTextWrapper}>
        <Carousel arrows infinite={false} dots={false}>
          <div className={styles.detailImgWrapper}>
            <img src={detailImg} alt="매물상세 이미지" />
          </div>
          <div className={styles.detailImgWrapper}>
            <img src={detailImg} alt="매물상세 이미지" />
          </div>
          <div className={styles.detailImgWrapper}>
            <img src={detailImg} alt="매물상세 이미지" />
          </div>
        </Carousel>
        <div className={styles.textWrapper}>
          <p>시골농가주택</p>
          <p className={styles.price}>월세 300/33</p>
          <p>강원특별자치도 양구군 방산면 평화로 4801</p>
          <p>리모델링한 시골농가주택</p>
          <div className={styles.profileWrapper}>
            <FaUserCircle color="#6D885D" size={30} />
            <div className={styles.profile}>
              <p>코스타 부동산</p>
              <p>010-1234-5678</p>
            </div>
          </div>
          <div className={styles.btnWrapper}>
            <img
              src={bookmark ? bookmarkTrueImg : bookmarkFalseImg}
              alt="북마크 이미지"
            />
            <Button01 size="medium">문의하기</Button01>
          </div>
        </div>
      </div>
      {/* 상세 테이블 */}
      <table className={styles.table}>
        <tbody>
          <tr>
            <td className={styles.title}>보증금/월세</td>
            <td className={styles.content}>300/33(만원)</td>
            <td className={styles.title}>관리비</td>
            <td className={styles.content}>13만원</td>
          </tr>
          <tr>
            <td className={styles.title}>층수(건물층)</td>
            <td className={styles.content}>1층(1층)</td>
            <td className={styles.title}>전용/공급면적</td>
            <td className={styles.content}>103㎡/103㎡</td>
          </tr>
          <tr>
            <td className={styles.title}>방 수</td>
            <td className={styles.content}>2개</td>
            <td className={styles.title}>욕실 수</td>
            <td className={styles.content}>1개</td>
          </tr>
          <tr>
            <td className={styles.title}>주차</td>
            <td className={styles.content}>2대</td>
            <td className={styles.title}>입주 가능일</td>
            <td className={styles.content}>2024.10.22 (협의 가능)</td>
          </tr>
          <tr>
            <td className={styles.title}>객실 시설</td>
            <td className={styles.longContent} colSpan="3">
              전자레인지, 가스레인지(인버터), 에어컨, 냉장고, 전기밥솥, TV,
              화장실(내부), 식탁, 옷걸이, 와이파이, 인터넷
            </td>
          </tr>
          <tr>
            <td className={styles.title}>상세 내용</td>
            <td className={styles.longContent} colSpan="3">
              최근 깔금하게 리모델링한 시골 농가주택입니다. 보증금 300에 월세 33
              저렴하게 올라온 매물이니 연락주세요.최근 깔금하게 리모델링한 시골
              농가주택입니다. 보증금 300에 월세 33 저렴하게 올라온 매물이니
              연락주세요.최근 깔금하게 리모델링한 시골 농가주택입니다. 보증금
              300에 월세 33 저렴하게 올라온 매물이니 연락주세요.최근 깔금하게
              리모델링한 시골 농가주택입니다. 보증금 300에 월세 33 저렴하게
              올라온 매물이니 연락주세요.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EstateDetail;
