import styles from './EstateSearch.module.scss';
import { useState } from 'react';
import EstateList from '../estateList/EstateList';
import EstateDetail from '../estateDetail/EstateDetail';
import { Modal } from 'antd';

const EstateSearch = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className={styles.container}>
      <div className={styles.topWrapper}>
        <ul className={styles.typeSelect}>
          <li>시골농가주택</li>
          <li>전원주택</li>
          <li>아파트/빌라</li>
          <li>농장/토지</li>
        </ul>
        <div className={styles.searchWrapper}>
          <input type="test" placeholder="매물을 검색해주세요."/>
          <button>검색</button>
        </div>
      </div>

      <div className={styles.bodyWrapper}>
        <EstateList isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        {/* 지도 들어감 */}
      </div>
      {isModalOpen &&
        <Modal open={isModalOpen} onCancel={handleCancel} width={857} footer={null} className={styles.customModal}>
          <EstateDetail />
        </Modal>
      }
    </div>

  );
}

export default EstateSearch;