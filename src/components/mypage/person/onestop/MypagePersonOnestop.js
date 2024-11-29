import { Modal, Pagination } from 'antd';
import styles from '../MypagePersonMain.module.scss';
import Button01 from 'components/commons/button/Button01';
import { useNavigate } from 'react-router';
import { useAtomValue } from 'jotai';
import { tokenAtom } from 'store/atoms';
import { useEffect, useState } from 'react';
import { axiosInToken } from 'lib/axios';
import { formatDate, formatRentType, processLocation } from 'utils/utils';

const MypagePersonOnestop = () => {
  const navigate = useNavigate();
  const token = useAtomValue(tokenAtom);
  const [onestopList, setOnestopList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  console.log(onestopList);

  const fetchData = () => {
    axiosInToken(token)
      .get('/user/mypageUserOnestopList')
      .then((res) => {
        console.log(res.data);
        setOnestopList([...res.data.content]);
        setTotalCount(res.data.totalElements);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (num) => {
    Modal.warning({
      content: '한번에 꾸하기 작성글을 삭제하시겠습니까?',
      onOk: () => {
        axiosInToken(token)
          .post(`/user/onestopDelete/${num}`)
          .then((res) => {
            console.log(res);
            if (res.data) {
              Modal.success({
                content: '한번에 꾸하기 작성글이 삭제되었습니다.',
              });
              fetchData();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
  };

  return (
    <>
      {onestopList.length === 0 ? (
        <div className={styles.noListText}>
          작성한 한번에 꾸하기 내역이 없습니다.
        </div>
      ) : (
        <>
          <table className={styles.customTable}>
            <colgroup>
              <col width="5%" />
              <col width="35%" />
              <col width="10%" />
              <col width="15%" />
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
              {onestopList.map((onestop, i) => (
                <tr
                  className={styles.rowWrap}
                  key={onestop.onestopNum}
                  onClick={() =>
                    navigate(`/onestop/detail/${onestop.onestopNum}`)
                  }
                >
                  <td>{i + 1}</td>
                  <td>{onestop.title}</td>
                  <td>{formatRentType(onestop.rentType)}</td>
                  <td>{`${processLocation(onestop.address1)} ${onestop.address2}`}</td>
                  <td>{formatDate(onestop.createdAt)}</td>
                  <td>{onestop.viewCount}</td>
                  <td>
                    <Button01
                      size="x-small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(onestop.onestopNum);
                      }}
                    >
                      삭제
                    </Button01>
                  </td>
                </tr>
              ))}
              {/* <tr className={styles.rowWrap}>
                <td>2</td>
                <td>
                  지방 빈 집 찾습니다. 경상남도 사천 위주로 알아보고 있어요.
                </td>
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
                <td>
                  지방 빈 집 찾습니다. 경상남도 사천 위주로 알아보고 있어요.
                </td>
                <td>매매</td>
                <td>경남 사천</td>
                <td>2024-10-27</td>
                <td>32</td>
                <td>
                  <Button01 size="x-small">삭제</Button01>
                </td>
              </tr> */}
            </tbody>
          </table>
          <Pagination defaultCurrent={1} total={totalCount} />
        </>
      )}
    </>
  );
};

export default MypagePersonOnestop;
