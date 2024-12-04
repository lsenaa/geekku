import styles from './MypageInteriorMain.module.scss';
import { Link } from 'react-router-dom';
import Button01 from 'components/commons/button/Button01';
import { Pagination } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { url } from 'lib/axios';
import { useSetAtom, useAtom, useAtomValue } from 'jotai';
import { userNameAtom, alarmsAtom, userAtom, tokenAtom } from 'store/atoms';
import { useEffect, useState } from 'react';

const MypageInteriorMain = () => {
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [isLoading, setIsLoading] = useState(true);

  const [myInterior, setMyInterior] = useState({
    intro: '',
    content: '',
    possiblePart: '',
    possibleLocation: '',
    period: '',
    recentCount: '',
    repairDate: '',
    onestopNum: 0,
  });

  useEffect(() => {
    axios
      .get(`${url}/company/interiorCompanyDetail`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setMyInterior(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.containerbox}>
        <div className={styles.title}>내 업체 정보</div>
        <br />
        <tbody>
          <tr>
            <td className={styles.leftcol}>업체명</td>
            <td className={styles.rightcol}>
              <p>{user.companyName}</p>
            </td>
          </tr>
          <tr>
            <td className={styles.leftcol}>부분시공 가능 여부</td>
            <td className={styles.rightcol}>
              <p>{myInterior.interior?.possiblePart ? '가능' : '불가능'}</p>
            </td>
          </tr>
          <tr>
            <td className={styles.leftcol}>경력</td>
            <td className={styles.rightcol}>
              {myInterior.interior?.period || 'N/A'}
            </td>
          </tr>
          <tr>
            <td className={styles.leftcol}>최근계약</td>
            <td className={styles.rightcol}>
              {myInterior.interior?.recentCount || 0}
            </td>
          </tr>
          <tr>
            <td className={styles.leftcol}>a/s보수기간</td>
            <td className={styles.rightcol}>
              {myInterior.repairDate || 'N/A'}
            </td>
          </tr>
          <tr>
            <td className={styles.leftcol}>시공 가능 지역</td>
            <td className={styles.rightcol}>
              {myInterior.interior?.possibleLocation || 'N/A'}
            </td>
          </tr>
          <tr>
            <td className={styles.leftcol}>한 줄 소개</td>
            <td className={styles.rightcol}>
              {myInterior.interior?.intro || 'N/A'}
            </td>
          </tr>
          <tr>
            <td className={styles.leftcol}>소개글</td>
            <td className={styles.rightcol}>
              <p>{myInterior.content || 'N/A'}</p>
            </td>
          </tr>
        </tbody>
      </div>
      <div className={styles.btncontain}>
        <Button01 size="small">
          <Link to={'/mypageInterior/modify'}>수정하기</Link>
        </Button01>
      </div>
    </div>
  );
};
export default MypageInteriorMain;
