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
  const { num } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const param = { id: user.userId, num: num };
    axios
      .post(`${url}/interiorDetail`, param)
      .then((res) => {
        setDetailInfo({ ...res.data });
        setBookmark(res.data.bookmark);
      })
      .catch((err) => {
        console.log(err);
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
        console.log(err);
      });
  };

  const allowedPaths = [
    `/profile/interior/${num}`,
    `/profile/interior/${num}/sample`,
    `/profile/interior/${num}/review`,
    `/profile/interior/${num}/introduce`,
  ];

  const isAllowedPath = allowedPaths.includes(location.pathname);

  return (
    <>
      {isAllowedPath && (
        <div className={styles.coverImgWrap}>
          <img
            src={`data:image/png;base64,${detailInfo.interiorDetail.coverImage}`} //바이트 타입으로 저장돼서 변환해줘야함
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
