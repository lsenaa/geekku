import styles from './ReqInteriorDetailAnswerList.module.scss';
import Button01 from '../../../commons/button/Button01';
import { useEffect, useRef, useState } from 'react';
import { Modal } from 'antd';
import ReqInteriorDetailAnswerWrite from './ReqInteriorDetailAnswerWrite';
import { axiosInToken, url } from 'lib/axios';
import { formatDate } from 'utils/utils';
import { Viewer } from '@toast-ui/react-editor';
import { useAtomValue } from 'jotai';
import { tokenAtom, userAtom } from 'store/atoms';
import axios from 'axios';
import useInfiniteScroll from 'hook/useInfiniteScroll';
import { RiQuestionAnswerLine } from 'react-icons/ri';

const ReqInteriorDetailAnswerList = ({ requestAllNum, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [interiorAnswerList, setInteriorAllAnswerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [answerIsOpen, setAnswerIsOpen] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const user = useAtomValue(userAtom);
  const token = useAtomValue(tokenAtom);
  const elementRef = useRef(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  // 답변 무한 스크롤
  const onIntersection = (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore && !isLoading) {
      setPage((prev) => prev + 1);
    }
  };

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // 컴포넌트가 언마운트되거나 더 이상 관찰할 필요가 없을 때(observer를 해제할 때)반환
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasMore, isLoading]);

  // 답변 데이터 요청
  const fetchData = (page) => {
    if (isLoading) return; //이미 데이터를 요청중인 경우 return

    setIsLoading(true);
    axios
      .get(`${url}/interiorAnswerList/${requestAllNum}?page=${page}`)
      .then((res) => {
        //console.log(res.data);

        if (res.data.interiorAnswerList.length === 0) {
          setHasMore(false);
        } else {
          setInteriorAllAnswerList((prev) => [
            ...prev,
            ...res.data.interiorAnswerList,
          ]);
          if (page === res.data.pageInfo.endPage) {
            setHasMore(false);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // 답변 클릭시 내용 보여주도록 토글
  const handleAnswer = (answerAllNum) => {
    setAnswerIsOpen((prev) => ({
      ...prev,
      [answerAllNum]: !prev[answerAllNum],
    }));
  };

  const handleDelete = (requestAllAnswerNum) => {
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
          .post(`/company/interiorAnswerDelete`, {
            requestAllAnswerNum,
            requestAllNum,
          })
          .then((res) => {
            Modal.success({
              content: '답변이 삭제되었습니다.',
            });
            setInteriorAllAnswerList((prev) =>
              prev.filter(
                (answer) => answer.houseAnswerNum !== requestAllAnswerNum
              )
            );
            // 현재 페이지 데이터 refetch
            axios
              .get(`${url}/interiorAnswerList/${requestAllNum}?page=${page}`)
              .then((res) => {
                //console.log('Refetching current page data:', res.data);
                setInteriorAllAnswerList((prev) => [
                  ...prev.slice(0, (page - 1) * 10), // 이전 페이지 데이터 유지
                  ...res.data.interiorAnswerList,
                ]);
                setHasMore(res.data.pageInfo.endPage > page);
              });
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
    <div className={styles.container}>
      <div className={styles.topWrap}>
        <div className={styles.iconTextWrap}>
          <RiQuestionAnswerLine size={25} />
          <h3>답변</h3>
        </div>
        {user.type === 'interior' && (
          <Button01 size="x-small" color="sub" onClick={toggleModal}>
            작성하기
          </Button01>
        )}
      </div>
      <hr className={styles.line} />
      <ul>
        <>
          {interiorAnswerList.length === 0 ? (
            <div>답변 내역이 없습니다.</div>
          ) : (
            <>
              {interiorAnswerList.map((answer) => (
                <li
                  className={styles.answerList}
                  key={answer.answerAllNum}
                  onClick={() => handleAnswer(answer.answerAllNum)}
                >
                  <div className={styles.preview}>
                    <div className={styles.profile}>
                      <div className={styles.profileImg}>
                        <img
                          src={
                            answer.companyProfileImage
                              ? `data:image/png;base64,${answer.companyProfileImage}`
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
                    {user.companyId === answer.companyId && (
                      <button
                        className={styles.deleteBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(answer.answerAllNum);
                        }}
                      >
                        삭제
                      </button>
                    )}
                  </div>
                  {answerIsOpen[answer.answerAllNum] && (
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
          <ReqInteriorDetailAnswerWrite
            userId={userId}
            requestAllNum={requestAllNum}
            toggleModal={toggleModal}
            setIsModalOpen={setIsModalOpen}
            setInteriorAllAnswerList={setInteriorAllAnswerList}
          />
        </Modal>
      )}
      {hasMore && (
        <div ref={elementRef} style={{ textAlign: 'center' }}>
          Load More Items
        </div>
      )}
    </div>
  );
};

export default ReqInteriorDetailAnswerList;
