import styles from './MypagePersonMain.module.scss';
import Button01 from 'components/commons/button/Button01';
import { Modal, Pagination } from 'antd';
import { axiosInToken } from 'lib/axios';
import { useAtomValue } from 'jotai';
import { tokenAtom, userAtom } from 'store/atoms';
import { useEffect, useState } from 'react';
import { formatDate, formatRentType, processLocation } from 'utils/utils';
import { useNavigate } from 'react-router';

const MypagePerson = () => {
  const navigate = useNavigate();
  const token = useAtomValue(tokenAtom);
  const [houseList, setHouseList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = () => {
    axiosInToken(token)
      .get('/user/mypageUserHouseList')
      .then((res) => {
        setHouseList([...res.data.content]);
        setTotalCount(res.data.totalElements);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = (houseNum) => {
    Modal.confirm({
      content: '집꾸 작성글을 삭제하시겠습니까?',
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
          .post(`/user/houseDelete/${houseNum}`)
          .then((res) => {
            console.error(res);
            if (res.data) {
              Modal.success({
                content: '집꾸 작성글이 삭제되었습니다.',
              });
              fetchData();
            }
          })
          .catch((err) => {
            console.error(err);
          });
      },
      onCancel: () => {
        //console.log('Cancel');
      },
    });
  };

  return (
    <>
      {houseList.length === 0 ? (
        <div className={styles.noListText}>작성한 집꾸 내역이 없습니다.</div>
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
              {houseList.map((house, i) => (
                <tr
                  className={styles.rowWrap}
                  key={house.houseNum}
                  onClick={() => navigate(`/house/detail/${house.houseNum}`)}
                >
                  <td>{i + 1}</td>
                  <td>{house.title}</td>
                  <td>{formatRentType(house.rentType)}</td>
                  <td>{`${processLocation(house.address1)} ${house.address2}`}</td>
                  <td>{formatDate(house.createdAt)}</td>
                  <td>{house.viewCount}</td>
                  <td>
                    <Button01
                      size="x-small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(house.houseNum);
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

export default MypagePerson;
