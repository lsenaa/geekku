import MypageSiderbar from 'components/layout/mypage/person/MypageSiderbar';
import styles from './MypagePersonMain.module.scss';
import { Link } from 'react-router-dom';
import MypageSubNavbar from 'components/layout/mypage/person/MypageSubNavbar';
import Button01 from 'components/commons/button/Button01';
import { Pagination } from 'antd';

const MypagePerson = () => {
  return (
    <>
      <table className={styles.customTable}>
        <colgroup>
          <col width="5%" />
          <col width="40%" />
          <col width="10%" />
          <col width="10%" />
          <col width="15%" />
          <col width="5%" />
          <col width="15%" />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>거래종류</th>
            <th>희망지역</th>
            <th>작성날짜</th>
            <th>조회수</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.rowWrap}>
            <td>3</td>
            <td>지방 빈 집 찾습니다. 경상남도 사천 위주로 알아보고 있어요.</td>
            <td>매매</td>
            <td>경남 사천</td>
            <td>2024-10-27</td>
            <td>32</td>
            <td>
              <Button01 size="x-small">삭제</Button01>
            </td>
          </tr>
          <tr className={styles.rowWrap}>
            <td>2</td>
            <td>지방 빈 집 찾습니다. 경상남도 사천 위주로 알아보고 있어요.</td>
            <td>매매</td>
            <td>경남 사천</td>
            <td>2024-10-27</td>
            <td>32</td>
            <td>
              <Button01 size="x-small">삭제</Button01>
            </td>
          </tr>
          <tr className={styles.rowWrap}>
            <td>1</td>
            <td>지방 빈 집 찾습니다. 경상남도 사천 위주로 알아보고 있어요.</td>
            <td>매매</td>
            <td>경남 사천</td>
            <td>2024-10-27</td>
            <td>32</td>
            <td>
              <Button01 size="x-small">삭제</Button01>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination defaultCurrent={1} total={50} />
    </>
  );
};

export default MypagePerson;
