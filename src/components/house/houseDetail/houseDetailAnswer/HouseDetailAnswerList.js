import styles from './HouseDetailAnswerList.module.scss';
import Button01 from '../../../commons/button/Button01';
import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import HouseDetailAnswerWrite from './HouseDetailAnswerWrite';
import axios from 'axios';
import { axiosInToken, url } from 'lib/axios';
import { formatDate } from 'utils/utils';
import { Viewer } from '@toast-ui/react-editor';
import { useAtom, useAtomValue } from 'jotai';
import { tokenAtom, userAtom } from 'store/atoms';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import useInfiniteScroll from 'hook/useInfiniteScroll';

const HouseDetailAnswerList = ({ houseNum, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [houseAnswerList, setHouseAnswerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [answerIsOpen, setAnswerIsOpen] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const user = useAtomValue(userAtom);
  const [token, setToken] = useAtom(tokenAtom);

  // 답변 작성 모달 토글
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  // 답변 데이터 요청
  const fetchData = (page) => {
    if (isLoading) return; //이미 데이터를 요청중인 경우 return

    setIsLoading(true);
    axios
      .get(`${url}/houseAnswerList/${houseNum}?page=${page}`)
      .then((res) => {
        console.log(res.data);

        if (res.data.houseAnswerList.length === 0) {
          setHasMore(false);
        } else {
          setHasMore(true);
          setHouseAnswerList((prev) => [...prev, ...res.data.houseAnswerList]);
          setTotalPages(res.data.pageInfo.endPage);
          if (page === res.data.pageInfo.endPage) {
            setHasMore(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDelete = (houseAnswerNum) => {
    Modal.confirm({
      content: '답변을 삭제하시겠습니까?',
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
          .post(`/company/houseAnswerDelete`, { houseAnswerNum, houseNum })
          .then((res) => {
            if (res.headers.authorization !== null) {
              setToken(res.headers.authorization);
            }
            Modal.success({
              content: '답변이 삭제되었습니다.',
            });
            setHouseAnswerList((prev) =>
              prev.filter((answer) => answer.houseAnswerNum !== houseAnswerNum)
            );
            // 현재 페이지 데이터 refetch
            axios
              .get(`${url}/houseAnswerList/${houseNum}?page=${page}`)
              .then((res) => {
                console.log('Refetching current page data:', res.data);
                setHouseAnswerList((prev) => [
                  ...prev.slice(0, (page - 1) * 10), // 이전 페이지 데이터 유지
                  ...res.data.houseAnswerList,
                ]);
                setHasMore(res.data.pageInfo.endPage > page);
              });
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

  const elementRef = useInfiniteScroll(async (entry, observer) => {
    if (hasMore && totalPages !== page) {
      setPage((prev) => prev + 1);
    }
  });

  // 답변 클릭시 내용 보여주도록 토글
  const handleAnswer = (answerHouseNum) => {
    setAnswerIsOpen((prev) => ({
      ...prev,
      [answerHouseNum]: !prev[answerHouseNum],
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.topWrap}>
        <div className={styles.iconTextWrap}>
          <RiQuestionAnswerLine size={25} />
          <h3>답변</h3>
        </div>
        {user.type === 'estate' && (
          <Button01 size="x-small" color="sub" onClick={toggleModal}>
            작성하기
          </Button01>
        )}
      </div>
      <hr className={styles.line} />
      <ul>
        <>
          {houseAnswerList.length === 0 ? (
            <div>답변 내역이 없습니다.</div>
          ) : (
            <>
              {houseAnswerList.map((answer) => (
                <li
                  className={styles.answerList}
                  key={answer.answerHouseNum}
                  onClick={() => handleAnswer(answer.answerHouseNum)}
                >
                  <div className={styles.preview}>
                    <div className={styles.profile}>
                      <div className={styles.profileImg}>
                        <img
                          src={
                            answer.companyProfileImage
                              ? `data:image/png;base64, ${answer.companyProfileImage}`
                              : ''
                          }
                          alt="프로필 이미지"
                        />
                      </div>
                      <div className={styles.profileDateWrap}>
                        <p className={styles.companyName}>
                          {answer.companyName}
                        </p>
                        <p className={styles.createdAt}>
                          {formatDate(answer.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className={styles.title}>{answer.title}</p>
                    {user?.companyId === answer.companyId && (
                      <button
                        className={styles.deleteBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(answer.answerHouseNum);
                        }}
                      >
                        삭제
                      </button>
                    )}
                  </div>
                  {answerIsOpen[answer.answerHouseNum] && (
                    <div>
                      <div className={styles.phoneAddWrap}>
                        <div className={styles.phone}>
                          <p>연락처</p>
                          <p>{answer.companyPhone}</p>
                        </div>
                        <div className={styles.address}>
                          <p>주소</p>
                          <p>{answer.companyAddress}</p>
                        </div>
                      </div>
                      <div className={styles.editorContent}>
                        <Viewer initialValue={answer.content} />
                      </div>
                    </div>
                  )}
                  <hr className={styles.line} />
                </li>
              ))}
            </>
          )}
        </>
      </ul>
      <>
        {isModalOpen && (
          <Modal
            open={isModalOpen}
            onCancel={toggleModal}
            width={857}
            footer={null}
            className={styles.customModal}
            centered
          >
            <HouseDetailAnswerWrite
              userId={userId}
              toggleModal={toggleModal}
              houseNum={houseNum}
              setIsModalOpen={setIsModalOpen}
              fetchData={fetchData}
              setHouseAnswerList={setHouseAnswerList}
            />
          </Modal>
        )}
      </>
      {hasMore && <div ref={elementRef}></div>}
    </div>
  );
};

export default HouseDetailAnswerList;
