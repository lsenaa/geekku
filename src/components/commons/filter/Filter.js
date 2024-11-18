import React, { useState } from 'react';
import styles from './Filter.module.scss';
import { Modal } from 'antd';
import CustomNav from 'components/commons/filter/CustomNav';

const Filter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.width}>
        <button className={styles.category} onClick={showModal}>
          정렬
        </button>
        <button className={styles.category} onClick={showModal}>
          주거형태
        </button>
        <button className={styles.category} onClick={showModal}>
          스타일
        </button>
        <button className={styles.category} onClick={showModal}>
          평수
        </button>
        <button className={styles.category} onClick={showModal}>
          지역
        </button>
      </div>
      <Modal
        title={<div className={styles.customTitle}>필터</div>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className={styles.divStyle}>
          <span className={styles.spanStyle}>정렬</span>
          <span className={styles.spanStyle}>주거형태</span>
          <span className={styles.spanStyle}>스타일</span>
          <span className={styles.spanStyle}>평수</span>
          <span className={styles.spanStyle}>지역</span>
          <hr />
        </div>

        <div className={styles.divStyle}>
          <div className={styles.spanStyle} id={styles.top}>
            정렬
          </div>
          <span className={styles.spanStyle}>최신순</span>
          <span className={styles.spanStyle}>과거순</span>
          <hr />
        </div>

        <div className={styles.divStyle}>
          <div className={styles.spanStyle} id={styles.top}>
            주거형태
          </div>
          <span className={styles.spanStyle}>농가주택</span>
          <span className={styles.spanStyle}>전원주택</span>
          <span className={styles.spanStyle}>아파트/빌라</span>
          <hr />
        </div>

        <div className={styles.divStyle}>
          <div className={styles.spanStyle} id={styles.top}>
            스타일
          </div>
          <span className={styles.spanStyle} id={styles.detail}>
            모던
          </span>
          <span className={styles.spanStyle} id={styles.detail}>
            우드
          </span>
          <span className={styles.spanStyle} id={styles.detail}>
            내추럴
          </span>
          <span className={styles.spanStyle} id={styles.detail}>
            클래식&엔틱
          </span>
          <span className={styles.spanStyle} id={styles.detail}>
            레트로&빈티지
          </span>
          <span className={styles.spanStyle} id={styles.detail}>
            미니멀
          </span>
          <hr />
        </div>

        <div className={styles.divStyle}>
          <div className={styles.spanStyle} id={styles.top}>
            평수
          </div>
          <span className={styles.spanStyle}>10평미만</span>
          <span className={styles.spanStyle}>10평대</span>
          <span className={styles.spanStyle}>20평대</span>
          <span className={styles.spanStyle}>30평대</span>
          <span className={styles.spanStyle}>40평대</span>
          <span className={styles.spanStyle}>50평대</span>
          <span className={styles.spanStyle}>50평대이상</span>
          <hr />
        </div>

        <div className={styles.divStyle}>
          <div className={styles.spanStyle} id={styles.top}>
            지역
          </div>
          <CustomNav />
        </div>
      </Modal>
    </>
  );
};

export default Filter;
