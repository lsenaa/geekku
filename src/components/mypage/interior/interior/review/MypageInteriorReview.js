import Button01 from 'components/commons/button/Button01';
import styles from './MypageInteriorReview.module.scss';
import { Modal, Pagination } from 'antd';
import reviewImg from 'assets/images/InteriorExam.jpg';
import { useNavigate } from 'react-router';
import { useAtomValue } from 'jotai';
import { tokenAtom } from 'store/atoms';
import { useEffect, useState } from 'react';
import { axiosInToken, url } from 'lib/axios';
import { formatDate } from 'utils/utils';

const MypageInteriorReview = () => {
  const navigate = useNavigate();
  const token = useAtomValue(tokenAtom);
  const [reviewList, setReviewList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInToken(token)
      .get('/company/myInteriorReviewList')
      .then((res) => {
        console.log(res);
        setReviewList([...res.data.interiorReviewList.content]);
        setTotalCount(res.data.totalElements);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {reviewList.length === 0 ? (
        <div className={styles.noListText}>작성된 후기 내역이 없습니다.</div>
      ) : (
        <>
          <table className={styles.customTable}>
            <colgroup>
              <col width="10%" />
              <col width="50%" />
              <col width="16%" />
            </colgroup>
            <thead>
              <tr>
                <th>대표 사진</th>
                <th>내용</th>
                <th>작성 날짜</th>
              </tr>
            </thead>
            <tbody>
              {reviewList.map((review) => (
                <tr className={styles.rowWrap} key={review.reviewNum}>
                  <td>
                    <img
                      src={
                        review.imageNums &&
                        `${url}/reviewImage/${review.imageNums.split(',')[0]}`
                      }
                      alt="후기 이미지"
                    />
                  </td>
                  <td>{review.content}</td>
                  <td>{formatDate(review.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination defaultCurrent={1} total={totalCount} />
        </>
      )}
    </>
  );
};

export default MypageInteriorReview;
