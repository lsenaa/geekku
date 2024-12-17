import { Modal, Pagination } from 'antd';
import { useNavigate } from 'react-router';
import { useAtomValue } from 'jotai';
import { tokenAtom } from 'store/atoms';
import { useEffect, useState } from 'react';
import { axiosInToken, url } from 'lib/axios';
import { formatDate } from 'utils/utils';
import Button01 from 'components/commons/button/Button01';
import styles from './MypageInteriorInquiry.module.scss';
//파일이름 잘못지음22 request 1:1 신청 받는 리스트
const MypageInteriorInquiry = () => {
  const navigate = useNavigate();
  const token = useAtomValue(tokenAtom);
  const [requestList, setRequestList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalCount, setTotalCount] = useState(0);
  const [interiorNum, setInteriorNum] = useState(null);
  // 페이지 변경 처리
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  useEffect(() => {
    fetchData();
    //console.log('interior', interiorNum);
  }, []);
  //console.log(requestList);
  const fetchData = () => {
    if (!token) {
      //console.log('Token is missing');
      return;
    }
    axiosInToken(token)
      .get(`${url}/company/myInteriorRequestList`)
      .then((res) => {
        //console.log('list', res.data.interiorRequestList.content);
        setRequestList([...res.data.interiorRequestList.content]);
        setTotalCount(res.data.totalElements);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = (requestNum) => {
    Modal.confirm({
      content: '인테리어 문의내역을 삭제하시겠습니까?',
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
          .post(`/user/mypageUserRequestInteriorDelete/${requestNum}`)
          .then((res) => {
            if (res.data) {
              Modal.success({
                content: '인테리어 문의내역이 삭제되었습니다.',
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
      {requestList.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          받은 인테리어 문의내역이 없습니다.
        </div>
      ) : (
        <>
          <table className={styles.customTable}>
            <colgroup>
              <col width="5%" />
              <col width="40%" />
              <col width="15%" />
              <col width="15%" />
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
                <th></th>
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
                  <td>{request.type}</td>
                  <td>{request.size}</td>
                  <td>{formatDate(request.createdAt)}</td>
                  <td>
                    <Button01
                      size="x-small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(request.requestNum);
                      }}
                    >
                      삭제
                    </Button01>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            current={currentPage}
            total={totalPages * 10} // 총 데이터 수에 맞게 수정
            onChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};
export default MypageInteriorInquiry;
