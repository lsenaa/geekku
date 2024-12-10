import styles from './EstateDetail.module.scss';
import bookmarkFalseImg from '../../../assets/images/bookmarkFalse.png';
import bookmarkTrueImg from '../../../assets/images/bookmarkTrue.png';
import { useEffect, useState } from 'react';
import { Carousel, Modal } from 'antd';
import { formatEstateType, formatPrice } from 'utils/utils';
import { axiosInToken, url } from 'lib/axios';
import { useAtomValue } from 'jotai';
import { tokenAtom, userAtom } from 'store/atoms';
import axios from 'axios';

const EstateDetail = ({ estateNum, estateImageNums }) => {
  const [bookmark, setBookmark] = useState(false);
  const user = useAtomValue(userAtom);
  const token = useAtomValue(tokenAtom);
  const [estate, setEstate] = useState({});
  const imgNumList = estateImageNums.split(',');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .post(`${url}/estateDetail`, {
        estateNum: estateNum,
        userId: user.userId ? user.userId : undefined,
      })
      .then((res) => {
        console.log(res.data);
        setEstate({ ...res.data.estate });
        setBookmark(res.data.bookmark);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBookmark = () => {
    axiosInToken(token)
      .post(`/user/estateBookmark/${estateNum}`)
      .then((res) => {
        if (res.data) {
          Modal.success({
            content: '매물 북마크가 완료되었습니다.',
          });
        } else {
          Modal.success({
            content: '매물 북마크가 해제되었습니다.',
          });
        }
        setBookmark(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          <div className={styles.btnWrapper}>
            {user.type === 'user' && user.username && (
              <img
                src={bookmark ? bookmarkTrueImg : bookmarkFalseImg}
                alt="북마크 이미지"
                onClick={handleBookmark}
              />
            )}
          </div>
          <p>{formatEstateType(estate.type)}</p>
          <p className={styles.price}>
            {formatPrice({
              jeonsePrice: estate.jeonsePrice,
              monthlyPrice: estate.monthlyPrice,
              depositPrice: estate.depositPrice,
              buyPrice: estate.buyPrice,
            })}
          </p>
          <p>{estate.address1 + ' ' + estate.address2}</p>
          <p className={styles.estateTitle}>{estate.title}</p>
          <div className={styles.profileWrapper}>
            <div className={styles.profileImg}>
              <img
                src={
                  `data:image/png;base64,${estate.companyProfileImage}` || ''
                }
                alt="프로필이미지"
              />
            </div>
            <div className={styles.profile}>
              <p>{estate.companyName}</p>
              <p>{estate.companyPhone}</p>
            </div>
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
              {estate.managePrice ? `${estate.managePrice}만원` : '없음'}
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
              {estate.parking ? estate.parking + '대' : '불가능'}
            </td>
            <td className={styles.title}>입주 가능일</td>
            <td className={styles.content}>
              {estate.availableDate} {estate.availableState && '(협의 가능)'}
            </td>
          </tr>
          <tr>
            <td className={styles.title}>객실 시설</td>
            <td className={styles.longContent} colSpan="3">
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
