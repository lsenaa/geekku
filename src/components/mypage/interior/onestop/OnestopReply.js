import { Pagination } from 'antd';
import Button01 from 'components/commons/button/Button01';
import MypageInteriorSiderbar from 'components/layout/mypage/interior/MypageInteriorSiderbar';
import MypageInteriorSubNavbar from 'components/layout/mypage/interior/MypageInteriorSubNavbar';
import styles from './OnestopReply.module.scss';

const MypageInteriorOnestop = () => {
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
            <th>시공종류</th>
            <th>희망지역</th>
            <th>작성 날짜</th>
            <th>조회수</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.rowWrap}>
            <td>3</td>
            <td>
              지방 인테리어 신청합니다. 경상남도 사천 위주로 알아보고 있어요.
            </td>
            <td>전체 시공</td>
            <td>경남 사천</td>
            <td>2024-10-27</td>
            <td>56</td>
            <td>
              <Button01 size="x-small">삭제</Button01>
            </td>
          </tr>
          <tr className={styles.rowWrap}>
            <td>2</td>
            <td>
              지방으로 내려갈 계획 세우는 중입니다. 인테리어 알아보고 있어요~~
            </td>
            <td>전체 시공</td>
            <td>충북 담양</td>
            <td>2024-10-27</td>
            <td>2</td>
            <td>
              <Button01 size="x-small">삭제</Button01>
            </td>
          </tr>
          <tr className={styles.rowWrap}>
            <td>1</td>
            <td>충청북도에서 부분 시공 인테리어 원해요!!</td>
            <td>부분 시공</td>
            <td>충북 담양</td>
            <td>2024-10-27</td>
            <td>13</td>
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
export default MypageInteriorOnestop;
