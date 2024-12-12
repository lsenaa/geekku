import MypageInteriorSiderbar from 'components/layout/mypage/interior/MypageInteriorSiderbar';
import styles from './MypageInteriorLayout.module.scss';
import { Outlet, useLocation } from 'react-router';
import MypageInteriorSubNavbar from 'components/layout/mypage/interior/MypageInteriorSubNavbar';
import { useSetAtom, useAtom, useAtomValue } from 'jotai';
import {
  userNameAtom,
  alarmsAtom,
  userAtom,
  tokenAtom,
} from '../../../../store/atoms';
import { useEffect, useState } from 'react';
const MypageInteriorLayout = () => {
  const location = useLocation();
  const allowedPaths = [
    '/mypage/interior',
    '/mypage/interior/manage/reqinterior',
    '/mypage/interior/manage/case',
    '/mypage/interior/manage/inquiry',
    '/mypage/interior/manage/review',
    '/mypage/interior/onestop',
    '/mypage/interior/info',
    '/mypage/interior/info/password',
  ];
  const MypageInteriorMain = () => {
    const [user, setUser] = useAtom(userAtom);
    const [token, setToken] = useAtom(tokenAtom);

    //디버깅
    useState(() => {
      setUser(user);
    });
    //console.log('마이페이지 인테리어 메인' + user);
  };
  const isAllowedPath = allowedPaths.includes(location.pathname);
  return (
    <div
      className={isAllowedPath ? styles.container : styles.notfoundContainer}
    >
      {isAllowedPath && <MypageInteriorSiderbar />}
      <div className={styles.contentWrap}>
        {isAllowedPath && <MypageInteriorSubNavbar />}
        <Outlet />
      </div>
    </div>
  );
};

export default MypageInteriorLayout;
