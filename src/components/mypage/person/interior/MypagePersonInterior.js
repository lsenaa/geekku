import { Modal, Pagination } from 'antd';
import Button01 from 'components/commons/button/Button01';
import styles from 'components/mypage/person/MypagePersonMain.module.scss';
import { useAtomValue } from 'jotai';
import { axiosInToken } from 'lib/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { tokenAtom, userAtom } from 'store/atoms';
import { formatDate, processLocation } from 'utils/utils';

const MypagePersonInterior = () => {
  const navigate = useNavigate();
  const token = useAtomValue(tokenAtom);
  const [interiorAllList, setInteriorAllList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInToken(token)
      .get('/user/mypageUserInteriorAllList')
      .then((res) => {
        console.log(res.data);
        setInteriorAllList([...res.data.content]);
        setTotalCount(res.data.totalElements);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (requestAllNum) => {
    Modal.confirm({
      content: '방꾸 작성글을 삭제하시겠습니까?',
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
          .post(`/user/interiorAllDelete/${requestAllNum}`)
          .then((res) => {
            console.log(res);
            if (res.data) {
              Modal.success({
                content: '방꾸 작성글이 삭제되었습니다.',
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
      {interiorAllList.length === 0 ? (
        <div className={styles.noListText}>작성한 방꾸 내역이 없습니다.</div>
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
                <th>시공종류</th>
                <th>희망지역</th>
                <th>작성 날짜</th>
                <th>조회수</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {interiorAllList.map((all, i) => (
                <tr
                  className={styles.rowWrap}
                  key={all.requestAllNum}
                  onClick={() =>
                    navigate(`/requestInterior/detail/${all.requestAllNum}`)
                  }
                >
                  <td>{i + 1}</td>
                  <td>{all.title}</td>
                  <td>{all.interiorType === 0 ? '부분시공' : '전체시공'}</td>
                  <td>{`${processLocation(all.address1)} ${all.address2}`}</td>
                  <td>{formatDate(all.createAt)}</td>
                  <td>{all.viewCount}</td>
                  <td>
                    <Button01
                      size="x-small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(all.requestAllNum);
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
export default MypagePersonInterior;
