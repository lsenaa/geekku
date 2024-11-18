import Button01 from 'components/commons/button/Button01';
import styles from './MypageInteriorReview.module.scss';
import { Pagination } from 'antd';
import reviewImg from 'assets/images/InteriorExam.jpg';

const MypageInteriorReview = () => {
  return (
    <>
      <table className={styles.customTable}>
        <colgroup>
          <col width="10%" />
          <col width="50%" />
          <col width="16%" />
          <col width="12%" />
        </colgroup>
        <thead>
          <tr>
            <th>대표 사진</th>
            <th>내용</th>
            <th>작성 날짜</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.rowWrap}>
            <td>
              <img src={reviewImg} alt="후기 이미지" />
            </td>
            <td>
              코스타 인테리어 업체 후기! 너무 친절하시고 진행도 빨라서 좋았어요.
              다음에 전체 인테리어 하게 된다면 다시 이용하고 싶어요. 추천추천!
            </td>
            <td>2024-10-27</td>
            <td>
              <Button01 size="x-small">삭제</Button01>
            </td>
          </tr>
          <tr className={styles.rowWrap}>
            <td>
              <img src={reviewImg} alt="후기 이미지" />
            </td>
            <td>
              코스타 인테리어 업체 후기! 너무 친절하시고 진행도 빨라서 좋았어요.
              다음에 전체 인테리어 하게 된다면 다시 이용하고 싶어요. 추천추천!
            </td>
            <td>2024-10-27</td>
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

export default MypageInteriorReview;
