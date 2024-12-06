import styles from './OnestopDetailAnswerList.module.scss';
import Button01 from '../../../commons/button/Button01';
import { FaUserCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import OnestopDetailAnswerWrite from './OnestopDetailAnswerWrite';
import { url } from 'lib/axios';
import { formatDate } from 'utils/utils';
import { Viewer } from '@toast-ui/react-editor';
import { useAtomValue } from 'jotai';
import { userAtom } from 'store/atoms';
import axios from 'axios';
import { RiQuestionAnswerLine } from 'react-icons/ri';

const OnestopDetailAnswerList = ({ onestopNum }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onestopAnswerList, setOnestopAnswerList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [answerIsOpen, setAnswerIsOpen] = useState({});
  const user = useAtomValue(userAtom);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${url}/onestopAnswerList/${onestopNum}`)
      .then((res) => {
        console.log(res.data);
        setOnestopAnswerList([...res.data.onestopAnswerList]);
        setTotalCount(res.data.pageInfo.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (onestopAnswerNum) => {
    axios
      .post(`${url}/onestopAnswerDelete`, { onestopAnswerNum, onestopNum })
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
        >
          <OnestopDetailAnswerWrite
            onestopNum={onestopNum}
            toggleModal={toggleModal}
            setIsModalOpen={setIsModalOpen}
            fetchData={fetchData}
          />
        </Modal>
      )}
    </div>
  );
};

export default OnestopDetailAnswerList;
