import { Modal, Pagination } from 'antd';
import Button01 from 'components/commons/button/Button01';
import MypageInteriorSiderbar from 'components/layout/mypage/interior/MypageInteriorSiderbar';
import MypageInteriorSubNavbar from 'components/layout/mypage/interior/MypageInteriorSubNavbar';
import styles from './MypageInteriorRequest.module.scss';
import { useAtom } from 'jotai';
import { url, axiosInToken } from 'lib/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { tokenAtom, userAtom } from 'store/atoms';
import { formatDate, processLocation } from 'utils/utils';

const MypageInteriorRequest = () => {
  const navigate = useNavigate();
  const [token, setToken] = useAtom(tokenAtom);
  const [interiorAllAnswerList, setInteriorAllAnswerList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    if (!token) {
      console.log('Token is missing');
      return;
    }
    axiosInToken(token)
      .get('/company/myInteriorAnswerList', {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log('API 응답 데이터:', res); // 전체 응답 출력
        console.log('res.data:', res.data); // res.data 존재 여부 확인
        console.log(
          'res.data.content:',
          res.data?.myInteriorAnswerList.content
        ); // content 속성 확인
        setInteriorAllAnswerList([...res.data.myInteriorAnswerList.content]);
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
          .post(`/user/interiorAllDelete/${requestAllNum}`, {
            headers: {
              Authorization: token,
            },
          })
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
      {interiorAllAnswerList.length === 0 ? (
        <div className={styles.noListText}>작성한 방꾸 내역이 없습니다.</div>
      ) : (
        <>
          <table className={styles.customTable}>
            <colgroup>
              <col width="5%" />
              <col width="40%" />
              <col width="10%" />
              <col width="10%" />
              <col width="15%" />
              <col width="5%" />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>시공종류</th>
                <th>희망지역</th>
                <th>작성 날짜</th>
              </tr>
            </thead>
            <tbody>
              {interiorAllAnswerList.map((allanswer, i) => (
                <tr
                  className={styles.rowWrap}
                  key={allanswer.answerrequestAllNum}
                  onClick={() =>
                    navigate(`/interiorall/detail/${allanswer.requestAllNum}`)
                  }
                >
                  <td>{i + 1}</td>
                  <td>{allanswer.title}</td>
                  <td>
                    {allanswer.interiorType === 0 ? '부분시공' : '전체시공'}
                  </td>
                  <td>{`${processLocation(allanswer.address1)} ${allanswer.address2}`}</td>
                  <td>{formatDate(allanswer.createAt)}</td>
                  <td>{allanswer.viewCount}</td>
                  <td>
                    <Button01
                      size="x-small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(allanswer.requestAllNum);
                      }}
                    >
                      삭제
                    </Button01>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination defaultCurrent={1} total={50} />
        </>
      )}
    </>
  );
};
export default MypageInteriorRequest;
