import styles from '../MypagePersonMain.module.scss';
import { Modal, Pagination } from 'antd';
import { useNavigate } from 'react-router';
import { useAtomValue } from 'jotai';
import { tokenAtom } from 'store/atoms';
import { useEffect, useState } from 'react';
import { axiosInToken } from 'lib/axios';
import { formatDate } from 'utils/utils';

const MypagePersonRequestInterior = () => {
  const navigate = useNavigate();
  const token = useAtomValue(tokenAtom);
  const [requestList, setRequestList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInToken(token)
      .get('/user/mypageUserInteriorRequestList')
      .then((res) => {
        console.log(res);
        setRequestList([...res.data.content]);
        setTotalCount(res.data.totalElements);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {requestList.length === 0 ? (
        <div className={styles.noListText}>작성한 문의 내역이 없습니다.</div>
      ) : (
        <>
          <table className={styles.customTable}>
            <colgroup>
              <col width="5%" />
              <col width="40%" />
              <col width="10%" />
              <col width="15%" />
              <col width="15%" />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>내용</th>
                <th>시공종류</th>
                <th>희망평수</th>
                <th>작성 날짜</th>
              </tr>
            </thead>
            <tbody>
              {requestList.map((request, i) => (
                <tr
                  className={styles.rowWrap}
                  key={request.requestNum}
                  onClick={() =>
                    navigate(`/interiorAnswer/${request.requestNum}`)
                  }
                >
                  <td>{i + 1}</td>
                  <td>{request.content}</td>
                  <td>
                    {request.type === 1 && '농가주택'}
                    {request.type === 2 && '아파트/빌라'}
                    {request.type === 3 && '전원주택'}
                    {request.type === 4 && '기타'}
                  </td>
                  <td>
                    {request.size === 1 && '20평 이하'}
                    {request.size === 2 && '20평 ~ 30평'}
                    {request.size === 3 && '30평 ~ 40평'}
                    {request.size === 4 && '40평 ~ 50평'}
                    {request.size === 5 && '50평 이상'}
                    {request.size === 6 && '기타'}
                  </td>
                  <td>{formatDate(request.createdAt)}</td>
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

export default MypagePersonRequestInterior;
