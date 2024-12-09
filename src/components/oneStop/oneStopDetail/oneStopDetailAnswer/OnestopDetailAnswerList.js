import styles from './OnestopDetailAnswerList.module.scss';
import Button01 from '../../../commons/button/Button01';
import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import OnestopDetailAnswerWrite from './OnestopDetailAnswerWrite';
import { axiosInToken, url } from 'lib/axios';
import { formatDate } from 'utils/utils';
import { Viewer } from '@toast-ui/react-editor';
import { useAtomValue } from 'jotai';
import { tokenAtom, userAtom } from 'store/atoms';
import axios from 'axios';
import useInfiniteScroll from 'hook/useInfiniteScroll';
import { RiQuestionAnswerLine } from 'react-icons/ri';

const OnestopDetailAnswerList = ({ oneStopNum, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onestopAnswerList, setOnestopAnswerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [answerIsOpen, setAnswerIsOpen] = useState({});
  const user = useAtomValue(userAtom);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const token = useAtomValue(tokenAtom);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = (page) => {
    if (isLoading) return; //이미 데이터를 요청중인 경우 return
    setIsLoading(true);
    axios
      .get(`${url}/onestopAnswerList/${oneStopNum}?page=${page}`)
      .then((res) => {
        console.log(res.data);

        if (res.data.onestopAnswerList.length === 0) {
          setHasMore(false);
        } else {
          setHasMore(true);
          setOnestopAnswerList([...res.data.onestopAnswerList]);
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

  const elementRef = useInfiniteScroll(async (entry, observer) => {
    if (hasMore && totalPages !== page) {
      setPage((prev) => prev + 1);
    }
  });

  const handleDelete = (onestopAnswerNum) => {
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
          .post(`/company/onestopAnswerDelete`, {
            onestopAnswerNum,
            oneStopNum,
          })
          .then((res) => {
            Modal.success({
              content: '답변이 삭제되었습니다.',
            });
            setOnestopAnswerList((prev) =>
              prev.filter(
                (answer) => answer.onestopAnswerNum !== onestopAnswerNum
              )
            );
            // 현재 페이지 데이터 refetch
            axios
              .get(`${url}/onestopAnswerList/${oneStopNum}?page=${page}`)
              .then((res) => {
                console.log('Refetching current page data:', res.data);
                setOnestopAnswerList((prev) => [
                  ...prev.slice(0, (page - 1) * 10), // 이전 페이지 데이터 유지
                  ...res.data.onestopAnswerList,
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

  const handleAnswer = (answerOnestopNum) => {
    setAnswerIsOpen((prev) => ({
      ...prev,
      [answerOnestopNum]: !prev[answerOnestopNum], // 현재 항목의 상태를 토글
    }));
  };
  return (
    <div className={styles.container}>
      <div className={styles.topWrap}>
        <div className={styles.iconTextWrap}>
          <RiQuestionAnswerLine size={25} />
          <h3>답변</h3>
        </div>
        {user.companyId && (
          <Button01 size="x-small" color="sub" onClick={toggleModal}>
            작성하기
          </Button01>
        )}
      </div>
      <hr className={styles.line} />
      <ul>
        <>
          {onestopAnswerList.length === 0 ? (
            <div>답변 내역이 없습니다.</div>
          ) : (
            <>
              {onestopAnswerList.map((answer) => (
                <li
                  className={styles.answerList}
                  key={answer.answerOnestopNum}
                  onClick={() => handleAnswer(answer.answerOnestopNum)}
                >
                  <div className={styles.preview}>
                    <div className={styles.profile}>
                      <img
                        src={`data:image/png;base64, ${answer.companyProfileImage}`}
                        alt="프로필 이미지"
                      />
                      <p className={styles.companyName}>{answer.companyName}</p>
                    </div>
                    <p className={styles.title}>{answer.title}</p>
                    <p className={styles.createdAt}>
                      {formatDate(answer.createdAt)}
                    </p>
                    {user.companyId === answer.companyId && (
                      <button
                        className={styles.deleteBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(answer.answerOnestopNum);
                        }}
                      >
                        삭제
                      </button>
                    )}
                  </div>
                  {answerIsOpen[answer.answerOnestopNum] && (
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
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onCancel={toggleModal}
          width={857}
          footer={null}
          className={styles.customModal}
          centered
        >
          <OnestopDetailAnswerWrite
            userId={userId}
            oneStopNum={oneStopNum}
            toggleModal={toggleModal}
            setIsModalOpen={setIsModalOpen}
            fetchData={fetchData}
            setOnestopAnswerList={setOnestopAnswerList}
          />
        </Modal>
      )}
      {hasMore && <div ref={elementRef}></div>}
    </div>
  );
};

export default OnestopDetailAnswerList;
