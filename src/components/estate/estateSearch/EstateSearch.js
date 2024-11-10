import styles from "./EstateSearch.module.scss";
import { useState } from "react";
import EstateList from "../estateList/EstateList";
import EstateDetail from "../estateDetail/EstateDetail";
import { Modal } from "antd";

const EstateSearch = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState(0);

  const handleCancel = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onClickType = (index) => () => {
    setType(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topWrapper}>
        <ul className={styles.typeSelect}>
          <li
            className={type === 0 ? styles.selected : undefined}
            onClick={onClickType(0)}
          >
            시골농가주택
          </li>
          <li
            className={type === 1 ? styles.selected : undefined}
            onClick={onClickType(1)}
          >
            전원주택
          </li>
          <li
            className={type === 2 ? styles.selected : undefined}
            onClick={onClickType(2)}
          >
            아파트/빌라
          </li>
          <li
            className={type === 3 ? styles.selected : undefined}
            onClick={onClickType(3)}
          >
            농장/토지
          </li>
        </ul>
        <div className={styles.searchWrapper}>
          <input type="test" placeholder="매물을 검색해주세요." />
          <button>검색</button>
        </div>
      </div>

      <div className={styles.bodyWrapper}>
        <EstateList isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        {/* 지도 들어감 */}
      </div>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          width={857}
          footer={null}
          className={styles.customModal}
        >
          <EstateDetail />
        </Modal>
      )}
    </div>
  );
};

export default EstateSearch;
