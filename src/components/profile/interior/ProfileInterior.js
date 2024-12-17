import styles from './ProfileInterior.module.scss';
import ProfileInteriorSidebar from 'components/layout/profile/ProfileInteriorSidebar';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import ProfileInteriorMenu from 'components/layout/profile/ProfileInteriorMenu';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from 'lib/axios';
import { useAtomValue } from 'jotai';
import { tokenAtom, userAtom } from 'store/atoms';
import { message } from 'antd';

const ProfileInterior = () => {
  const { num } = useParams();
  const location = useLocation();
  const [bookmark, setBookmark] = useState(false);
  const user = useAtomValue(userAtom);
  const token = useAtomValue(tokenAtom);
  const [messageApi, contextHolder] = message.useMessage();
  const [detailInfo, setDetailInfo] = useState({
    sampleCount: 0,
    reviewCount: 0,
    interiorDetail: {},
    sampleDetail: [],
    reviewDetail: [],
  });

  useEffect(() => {
    const param = { id: user.userId, num: num };
    axios
      .post(`${url}/interiorDetail`, param)
      .then((res) => {
        //console.log(res.data);
        //console.log(res.data.bookmark);
        // if (res.data.reviewDetail && Array.isArray(res.data.reviewDetail)) {
        //   let resReview = res.data.reviewDetail;
        //   console.log(resReview);
        //   resReview.forEach((review) => {
        //     if (review.imageNums) {
        //       const imageNumList = review.imageNums.split(',').map(num);
        //       console.log(imageNumList);
        //     }
        //   });
        // } else {
        //   console.error('오류');
        // }
        setDetailInfo({ ...res.data });
        setBookmark(res.data.bookmark);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [num]);

  const bookmarkClick = (e) => {
    axios
      .get(
        `${url}/user/interiorBookmark/${detailInfo.interiorDetail.interiorNum}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          messageApi.open({
            type: 'success',
            content: '북마크가 완료되었습니다.',
          });
        } else {
          messageApi.open({
            type: 'success',
            content: '북마크가 해제되었습니다.',
          });
        }
        setBookmark(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //console.log('Current path:', location.pathname); // 현재 경로 확인

  const allowedPaths = [
    `/profile/interior/${num}`,
    `/profile/interior/${num}/sample`,
    `/profile/interior/${num}/review`,
    `/profile/interior/${num}/introduce`,
  ];

  const isAllowedPath = allowedPaths.includes(location.pathname);

  //console.log(detailInfo);
  return (
    <>
      {isAllowedPath && (
        <div className={styles.coverImgWrap}>
          <img
            src={
              detailInfo.interiorDetail.coverImage &&
              `data:image/png;base64,${detailInfo.interiorDetail.coverImage}`
            }
            alt="인테리어업체 커버이미지"
          />
        </div>
      )}
      <div
        className={isAllowedPath ? styles.container : styles.notfoundContainer}
      >
        {isAllowedPath && (
          <ProfileInteriorSidebar
            detailInfo={detailInfo}
            bookmarkClick={bookmarkClick}
            bookmark={bookmark}
            interiorNum={num}
          />
        )}
        <div className={styles.contentWrap}>
          {isAllowedPath && (
            <ProfileInteriorMenu detailInfo={detailInfo} num={num} />
          )}
          <Outlet
            context={{
              detailInfo: detailInfo,
              num: num,
              interiorNum: num,
            }}
          />
        </div>
      </div>
      {contextHolder}
    </>
  );
};

export default ProfileInterior;
