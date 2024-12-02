import Filter from 'components/commons/filter/Filter';
import styles from './Sample.module.scss';
import Card from './Card';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from 'lib/axios';

const SampleList = () => {
  const [sampleList, setSampleList] = useState([]);
  const navigate = useNavigate();

  const moveRegister = () => {
    navigate('/sampleRegister');
  };

  useEffect(() => {
    axios
      .get(`${url}/sampleList`)
      .then((res) => {
        console.log(res.data);
        setSampleList([...res.data.sampleList]);
      })
      .catch((error) => {
        console.error(error);
        setSampleList([]);
      });
  }, []);

  return (
    <div className={styles.all}>
      <p className={styles.title}>시공사례</p>
      <div className={styles.midBar}>
        <Filter />
        <button id={styles.regBtn} onClick={moveRegister}>
          등록하기
        </button>
      </div>
      <div className={styles.cardList}>
        <Card sampleList={sampleList} />
      </div>
    </div>
  );
};

export default SampleList;
