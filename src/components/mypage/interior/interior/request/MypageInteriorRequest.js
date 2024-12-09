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
  const [data, setData] = useState([]); // 데이터 초기값 빈 배열
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
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
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              {interiorAllAnswerList.map((answerAllNum, i) => (
                <tr
                  className={styles.rowWrap}
                  key={answerAllNum.answerrequestAllNum}
                  onClick={() =>
                    navigate(
                      `/interiorall/detail/${answerAllNum.requestAllNum}`
                    )
                  }
                >
                  <td>{i + 1}</td>
                  <td>{answerAllNum.title}</td>
                  <td>
                    {answerAllNum.interiorType === 0 ? '부분시공' : '전체시공'}
                  </td>
                  <td>{`${processLocation(answerAllNum.address1)} ${answerAllNum.address2}`}</td>
                  <td>{formatDate(answerAllNum.createAt)}</td>
                  <td>{answerAllNum.viewCount}</td>
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
