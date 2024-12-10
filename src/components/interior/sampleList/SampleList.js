import Filter from 'components/commons/filter/Filter';
import styles from './Sample.module.scss';
import Card from './Card';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from 'lib/axios';
import qs from 'qs';
import { useAtomValue } from 'jotai';
import { userAtom } from 'store/atoms';
import TopButton from 'components/layout/topbutton/TopButton';

const SampleList = () => {
  const user = useAtomValue(userAtom);
  const [sampleList, setSampleList] = useState([]);
  const [filteredSamples, setFilteredSamples] = useState([]);
  const navigate = useNavigate();

  const [filterConditions, setFilterConditions] = useState({
    date: '',
    types: [],
    styles: [],
    sizes: [],
    location: [],
  });

  const handleFilter = (newConditions) => {
    setFilterConditions(newConditions);
  };

  const moveRegister = () => {
    navigate('/sampleRegister');
  };

  useEffect(() => {
    console.log(filterConditions);
    axios
      .get(`${url}/sampleList`, {
        params: {
          date: filterConditions.date,
          types: filterConditions.types,
          styles: filterConditions.styles,
          sizes: filterConditions.sizes,
          location: filterConditions.location,
          // filterConditions  객체타입으로 받으면 그안에 정보를 명시해줘야 반영, 객체로 파라미터를 주면 필터 적용x
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'comma' });
        },
      })
      .then((res) => {
        console.log(res.data);
        setSampleList([...res.data.sampleList]);
      })
      .catch((error) => {
        console.error(error);
        setSampleList([]);
      });
  }, [filterConditions]);

  return (
    <div className={styles.all}>
      <p className={styles.title}>시공사례</p>
      <div className={styles.midBar}>
        <Filter onFilter={handleFilter} />
        {user.type === 'interior' && (
          <button id={styles.regBtn} onClick={moveRegister}>
            등록하기
          </button>
        )}
      </div>
      <div className={styles.cardList}>
        <Card sampleList={sampleList} />
      </div>
      <TopButton />
    </div>
  );
};

export default SampleList;
