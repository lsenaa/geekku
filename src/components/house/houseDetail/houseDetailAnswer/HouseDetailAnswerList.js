import styles from './HouseDetailAnswerList.module.scss';
import Button01 from '../../../commons/button/Button01';
import { FaUserCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import HouseDetailAnswerWrite from './HouseDetailAnswerWrite';
import axios from 'axios';
import { url } from 'lib/axios';
import { formatDate } from 'utils/utils';

const HouseDetailAnswerList = ({ houseNum }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [houseAnswerList, setHouseAnswerList] = useState([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${url}/houseAnswerList/${houseNum}`)
      .then((res) => {
        console.log(res.data);
        setHouseAnswerList([...res.data.houseAnswerList]);
      })
      .catch((err) => {
        console.log(err);
      });
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
        {houseAnswerList.map((answer) => (
          <div key={answer.answerHouseNum}>
            <li key={answer.answerHouseNum}>
              <div>
                <div className={styles.profile}>
                  <img
                    src={`data:image/png;base64, ${answer.companyProfileImage}`}
                  />
                  <p>{answer.companyName}</p>
                  <p className={styles.createdAt}>
                    {formatDate(answer.createdAt)}
                  </p>
                  <button>삭제</button>
                </div>
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
              </div>
              <div className={styles.editorContent}>
                <p>{answer.content}</p>
              </div>
            </li>
            <hr className={styles.line} />
          </div>
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
            toggleModal={toggleModal}
            houseNum={houseNum}
          />
        </Modal>
      )}
    </div>
  );
};

export default HouseDetailAnswerList;
