import styles from './MypageInteriorMain.module.scss';
import { Link } from 'react-router-dom';
import Button01 from 'components/commons/button/Button01';
import { Pagination } from 'antd';

const MypageInteriorMain = () => {
  return (
    <>
      <div className={styles.containerbox}>
        <div className={styles.title}>내 업체 정보</div>
        <br />
        <tbody>
          <tr>
            <td className={styles.leftcol}>업체명</td>
            <td className={styles.rightcol}>코스타 인테리어</td>
          </tr>
          <tr>
            <td className={styles.leftcol}>부분시공 가능 여부</td>
            <td className={styles.rightcol}>가능</td>
          </tr>
          <tr>
            <td className={styles.leftcol}>경력</td>
            <td className={styles.rightcol}>5년</td>
          </tr>
          <tr>
            <td className={styles.leftcol}>최근계약</td>
            <td className={styles.rightcol}>20241029</td>
          </tr>
          <tr>
            <td className={styles.leftcol}>a/s보수기간</td>
            <td className={styles.rightcol}>24개월</td>
          </tr>
          <tr>
            <td className={styles.leftcol}>시공 가능 지역</td>
            <td className={styles.rightcol}>경기 전라</td>
          </tr>
          <tr>
            <td className={styles.leftcol}>한 줄 소개</td>
            <td className={styles.rightcol}>모던...isdone</td>
          </tr>
          <tr>
            <td className={styles.leftcol}>소개글</td>
            <td className={styles.rightcol}>
              300자이내소개글을표현해봐요 구구절절이
              아파트아파트아파트아파트아파트아파트어허어허
              소개글예시500자이내로작성
            </td>
          </tr>
        </tbody>
      </div>
      <div className={styles.btncontain}>
        <Button01 size="small">
          <Link to={'/mypageInterior/modify'}>수정하기</Link>
        </Button01>
      </div>
    </>
  );
};
export default MypageInteriorMain;
