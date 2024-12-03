import Button01 from 'components/commons/button/Button01';
import styles from './MypagePersonReview.module.scss';
import { Modal, Pagination } from 'antd';
import reviewImg from 'assets/images/InteriorExam.jpg';
import { useNavigate } from 'react-router';
import { useAtomValue } from 'jotai';
import { tokenAtom } from 'store/atoms';
import { useEffect, useState } from 'react';
import { axiosInToken } from 'lib/axios';
import { formatDate } from 'utils/utils';

const MypagePersonReview = () => {
  const navigate = useNavigate();
  const token = useAtomValue(tokenAtom);
  const [reviewList, setReviewList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInToken(token)
      .get('/user/mypageUserReviewList')
      .then((res) => {
        console.log(res);
        setReviewList([...res.data.content]);
        setTotalCount(res.data.totalElements);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (reviewNum) => {
    Modal.confirm({
      content: '인테리어 업체 후기를 삭제하시겠습니까?',
      okText: '삭제',
      cancelText: '취소',
      okButtonProps: {
        style: {
          backgroundColor: '#6d885d',
          borderColor: 'none',
          color: 'white',
        },
      },
      cancelButtonProps: {
        style: {
          backgroundColor: 'transparent',
          borderColor: '#6d885d',
          color: '#6d885d',
        },
      },
      onOk: () => {
        axiosInToken(token)
          .post(`/user/mypageUserReviewDelete/${reviewNum}`)
          .then((res) => {
            if (res.data) {
              Modal.success({
                content: '인테리어 업체 후기가 삭제되었습니다.',
              });
              fetchData();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      onCancel: () => {
        console.log('Cancel');
      },
    });
  };

  return (
    <>
      {reviewList.length === 0 ? (
        <div className={styles.noListText}>작성한 후기 내역이 없습니다.</div>
      ) : (
        <>
          <table className={styles.customTable}>
            <colgroup>
              <col width="10%" />
              <col width="50%" />
              <col width="16%" />
              <col width="12%" />
              <col width="12%" />
            </colgroup>
            <thead>
              <tr>
                <th>대표 사진</th>
                <th>내용</th>
                <th>작성 날짜</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {reviewList.map((review) => (
                <tr
                  className={styles.rowWrap}
                  key={review.reviewNum}
                  // onClick={() =>
                  //   navigate(`/profile/interior/${review.interiorNum}`, {
                  //     state: { interiorNum: review.interiorNum },
                  //   })
                  // }
                >
                  <td>
                    {/* <img src={review.imageNums && review.imageNums.split(",")[0]} alt="후기 이미지" /> */}
                    <img src={reviewImg} alt="후기 이미지" />
                  </td>
                  <td>{review.content}</td>
                  <td>{formatDate(review.createdAt)}</td>
                  <td>
                    <button
                      className={styles.editBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/reviewWrite');
                      }}
                    >
                      수정
                    </button>
                  </td>
                  <td>
                    <Button01
                      size="x-small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(review.reviewNum);
                      }}
                    >
                      삭제
                    </Button01>
                  </td>
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

export default MypagePersonReview;
