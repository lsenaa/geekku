import styles from './ProfileInterior.module.scss';
import profileImg from 'assets/images/interiorProfileImg.png';
import ProfileInteriorSidebar from 'components/layout/profile/ProfileInteriorSidebar';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import ProfileInteriorMenu from 'components/layout/profile/ProfileInteriorMenu';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from 'lib/axios';

const ProfileInterior = () => {
  const location = useLocation();
  // console.log(location);

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
    const param = { num: num };
    axios
      .post(`${url}/interiorDetail`, param)
      .then((res) => {
        console.log(res.data);
        setDetailInfo({ ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [num]);

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
        {isAllowedPath && <ProfileInteriorSidebar detailInfo={detailInfo} />}
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
