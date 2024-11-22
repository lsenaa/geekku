import styles from './EstateSearch.module.scss';
import { useEffect, useState } from 'react';
import EstateList from '../estateList/EstateList';
import EstateDetail from '../estateDetail/EstateDetail';
import { Modal } from 'antd';
import KakaoMap from 'components/map/KakaoMap';
import axios from 'axios';
import { url } from 'lib/axios';

const EstateSearch = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState(0);
  const [estateList, setEstateList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancel = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onClickType = (index) => () => {
    setType(index);
  };

  const fetchData = () => {
    axios
      .get(`${url}/estateList`)
      .then((res) => {
        // console.log(res.data);
        setEstateList([...res.data.estateList]);
      })
      .catch((err) => {
        console.log(err);
      });
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
        <EstateList
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          estateList={estateList}
        />
        <KakaoMap />
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
