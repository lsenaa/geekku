import styles from './HouseDetailAnswerList.module.scss';
import Button01 from '../../../commons/button/Button01';
import { useEffect, useRef, useState } from 'react';
import { Modal } from 'antd';
import HouseDetailAnswerWrite from './HouseDetailAnswerWrite';
import axios from 'axios';
import { axiosInToken, url } from 'lib/axios';
import { formatDate } from 'utils/utils';
import { Viewer } from '@toast-ui/react-editor';
import { useAtomValue } from 'jotai';
import { tokenAtom, userAtom } from 'store/atoms';
import { RiQuestionAnswerLine } from 'react-icons/ri';

const HouseDetailAnswerList = ({ houseNum, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [houseAnswerList, setHouseAnswerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [answerIsOpen, setAnswerIsOpen] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const user = useAtomValue(userAtom);
  const elementRef = useRef(null);
  const token = useAtomValue(tokenAtom);

  // 답변 작성 모달 토글
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
      .get(`${url}/houseAnswerList/${houseNum}?page=${page}`)
      .then((res) => {
        console.log(res.data);

        if (res.data.houseAnswerList.length === 0) {
          setHasMore(false);
        } else {
          setHouseAnswerList((prev) => [...prev, ...res.data.houseAnswerList]);
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
    axiosInToken(token)
      .post(`/company/houseAnswerDelete`, { houseAnswerNum, houseNum })
      .then((res) => {
        console.log(res);
        Modal.success({
          content: '답변이 삭제되었습니다.',
          onOk: () => {
            fetchData();
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <Button01 size="x-small" color="sub" onClick={toggleModal}>
          작성하기
        </Button01>
      </div>
      <hr className={styles.line} />
      <ul>
        {houseAnswerList.map((answer) => (
          <li
            className={styles.answerList}
            key={answer.answerHouseNum}
            onClick={() => handleAnswer(answer.answerHouseNum)}
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
              <p className={styles.createdAt}>{formatDate(answer.createdAt)}</p>
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
          <HouseDetailAnswerWrite
            userId={userId}
            toggleModal={toggleModal}
            houseNum={houseNum}
            setIsModalOpen={setIsModalOpen}
            fetchData={fetchData}
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

export default HouseDetailAnswerList;
