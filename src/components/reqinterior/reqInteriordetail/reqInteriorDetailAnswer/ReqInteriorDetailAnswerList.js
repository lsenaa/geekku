import styles from './ReqInteriorDetailAnswerList.module.scss';
import Button01 from '../../../commons/button/Button01';
import { FaUserCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import ReqInteriorDetailAnswerWrite from './ReqInteriorDetailAnswerWrite';
import { url } from 'lib/axios';
import { formatDate } from 'utils/utils';
import { Viewer } from '@toast-ui/react-editor';
import { useAtomValue } from 'jotai';
import { userAtom } from 'store/atoms';
import axios from 'axios';
const ReqInteriorDetailAnswerList = ({ requestAllNum }) => {
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
      .get(`${url}/interiorAnswerList/${requestAllNum}`)
      .then((res) => {
        console.log(res.data);
        setOnestopAnswerList([...res.data.onestopAnswerList]);
        setTotalCount(res.data.pageInfo.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (interiorAllAnswerNum) => {
    axios
      .post(`${url}/interiorAnswerDelete`, {
        interiorAllAnswerNum,
        requestAllNum,
      })
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

  const handleAnswer = (answerInteriorNum) => {
    setAnswerIsOpen((prev) => ({
      ...prev,
      [answerInteriorNum]: !prev[answerInteriorNum], // 현재 항목의 상태를 토글
    }));
  };
  return (
    <div className={styles.container}>
      <div className={styles.topWrap}>
        <h3>답변</h3>
        <Button01 size="x-small" color="sub" onClick={toggleModal}>
          작성하기
        </Button01>
      </div>
      <hr className={styles.line} />
      <ul>
        {onestopAnswerList.map((answer) => (
          <li
            className={styles.answerList}
            key={answer.answerOnestopNum}
            onClick={() => handleAnswer(answer.answerInteriorNum)}
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
      </ul>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onCancel={toggleModal}
          width={857}
          footer={null}
          className={styles.customModal}
        >
          <ReqInteriorDetailAnswerWrite
            requestAllNum={requestAllNum}
            toggleModal={toggleModal}
            setIsModalOpen={setIsModalOpen}
            fetchData={fetchData}
          />
        </Modal>
      )}
    </div>
  );
};

export default ReqInteriorDetailAnswerList;
