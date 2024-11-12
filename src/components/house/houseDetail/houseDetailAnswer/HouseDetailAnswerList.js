import styles from './HouseDetailAnswerList.module.scss';
import Button01 from '../../../commons/button/Button01';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import { Modal } from 'antd';
import HouseDetailAnswerWrite from './HouseDetailAnswerWrite';

const HouseDetailAnswerList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
        <li>
          <div>
            <div className={styles.profile}>
              <FaUserCircle color="#6D885D" size={30} />
              <p>코스타 부동산</p>
              <p className={styles.createdAt}>2024-10-28</p>
              <button>삭제</button>
            </div>
            <div className={styles.phoneAddWrap}>
              <div className={styles.phone}>
                <p>연락처</p>
                <p>010-1234-5678</p>
              </div>
              <div className={styles.address}>
                <p>주소</p>
                <p>
                  강원특별자치도 춘천시 안마산로 131 상가씨동 1층
                  C-106호(퇴계동)
                </p>
              </div>
            </div>
          </div>
          <div className={styles.editorContent}>
            <p>
              에디터 내용 들어갈 자리 Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </p>
          </div>
        </li>
        <hr className={styles.line} />
        <li>
          <div>
            <div className={styles.profile}>
              <FaUserCircle color="#6D885D" size={30} />
              <p>코스타 부동산</p>
              <p className={styles.createdAt}>2024-10-28</p>
              <button>삭제</button>
            </div>
            <div className={styles.phoneAddWrap}>
              <div className={styles.phone}>
                <p>연락처</p>
                <p>010-1234-5678</p>
              </div>
              <div className={styles.address}>
                <p>주소</p>
                <p>
                  강원특별자치도 춘천시 안마산로 131 상가씨동 1층
                  C-106호(퇴계동)
                </p>
              </div>
            </div>
          </div>
          <div className={styles.editorContent}>
            <p>
              에디터 내용 들어갈 자리 Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </p>
          </div>
        </li>
      </ul>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onCancel={toggleModal}
          width={857}
          footer={null}
          className={styles.customModal}
        >
          <HouseDetailAnswerWrite toggleModal={toggleModal} />
        </Modal>
      )}
    </div>
  );
};

export default HouseDetailAnswerList;
