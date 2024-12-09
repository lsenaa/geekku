import styles from './ProfileInterior.module.scss';
import profileImg from 'assets/images/interiorProfileImg.png';
import ProfileInteriorSidebar from 'components/layout/profile/ProfileInteriorSidebar';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import ProfileInteriorMenu from 'components/layout/profile/ProfileInteriorMenu';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from 'lib/axios';
import { useAtomValue } from 'jotai';
import { tokenAtom, userAtom } from 'store/atoms';

const ProfileInterior = () => {
  const location = useLocation();
  // console.log(location);

  const [bookmark, setBookmark] = useState(false);
  const user = useAtomValue(userAtom);
  const token = useAtomValue(tokenAtom);

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
        console.log(res.data);
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
        setBookmark(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log('Current path:', location.pathname); // 현재 경로 확인

  const allowedPaths = [
    `/profile/interior/${num}`,
    `/profile/interior/${num}/sample`,
    `/profile/interior/${num}/review`,
    `/profile/interior/${num}/introduce`,
  ];

  const isAllowedPath = allowedPaths.includes(location.pathname);

  console.log(detailInfo);
  return (
    <>
      {isAllowedPath && (
        <div className={styles.coverImgWrap}>
          <img src={profileImg} alt="인테리어업체 커버이미지" />
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
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileInterior;
