import styles from './EstateDetail.module.scss';
import detailImg from '../../../assets/images/estateDetailImg.png';
import bookmarkFalseImg from '../../../assets/images/bookmarkFalse.png';
import bookmarkTrueImg from '../../../assets/images/bookmarkTrue.png';
import { FaUserCircle } from 'react-icons/fa';
import Button01 from '../../commons/button/Button01';
import { useState } from 'react';
import { Carousel } from 'antd';
import { formatEstateType, formatPrice } from 'utils/utils';
import { url } from 'lib/axios';

const EstateDetail = ({ estate }) => {
  const imgNumList = estate.estateImageNums.split(',');
  const [bookmark, setBookmark] = useState(false);

  // console.log(estate);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.imgTextWrapper}>
        <Carousel arrows infinite={false} dots={false}>
          {imgNumList.map((num) => (
            <div className={styles.detailImgWrapper} key={num}>
              <img src={`${url}/estateImage/${num}`} alt="매물상세 이미지" />
            </div>
          ))}
        </Carousel>
        <div className={styles.textWrapper}>
          <p>{formatEstateType(estate.type)}</p>
          <p className={styles.price}>
            {' '}
            {formatPrice({
              jeonsePrice: estate.jeonsePrice,
              monthlyPrice: estate.monthlyPrice,
              depositPrice: estate.depositPrice,
              buyPrice: estate.buyPrice,
            })}
          </p>
          <p>{estate.address1 + ' ' + estate.address2}</p>
          <p>{estate.title}</p>
          <div className={styles.profileWrapper}>
            <FaUserCircle color="#6D885D" size={30} />
            <div className={styles.profile}>
              <p>{estate.companyName}</p>
              <p>{estate.companyPhone}</p>
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

            <td className={styles.content}>
              {estate.depositPrice
                ? `${estate.depositPrice}/${estate.monthlyPrice}(만원)`
                : '없음'}
            </td>
            <td className={styles.title}>관리비</td>
            <td className={styles.content}>
              {estate.managePrice !== 0 ? estate.managePrice : '없음'}
            </td>
          </tr>
          <tr>
            <td className={styles.title}>층수(건물층)</td>
            <td className={styles.content}>
              {estate.floor}층({estate.totalFloor}층)
            </td>
            <td className={styles.title}>전용/공급면적</td>
            <td className={styles.content}>
              {estate.size1}㎡/{estate.size2}㎡
            </td>
          </tr>
          <tr>
            <td className={styles.title}>방 수</td>
            <td className={styles.content}>{estate.roomCount}개</td>
            <td className={styles.title}>욕실 수</td>
            <td className={styles.content}>{estate.bathCount}개</td>
          </tr>
          <tr>
            <td className={styles.title}>주차</td>
            <td className={styles.content}>
              {estate.parking !== 0 ? estate.parking + '대' : '불가능'}
            </td>
            <td className={styles.title}>입주 가능일</td>
            <td className={styles.content}>
              {estate.availableDate} {estate.availableState && '(협의 가능)'}
            </td>
          </tr>
          <tr>
            <td className={styles.title}>객실 시설</td>
            <td className={styles.longContent} colSpan="3">
              {/* 전자레인지, 가스레인지(인버터), 에어컨, 냉장고, 전기밥솥, TV,
              화장실(내부), 식탁, 옷걸이, 와이파이, 인터넷 */}
              {estate.utility}
            </td>
          </tr>
          <tr>
            <td className={styles.title}>상세 내용</td>
            <td className={styles.longContent} colSpan="3">
              {estate.content}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EstateDetail;
