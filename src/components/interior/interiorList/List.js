import './List.css';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { url } from 'lib/axios';
import axios from 'axios';

const List = ({ loc, setLoc }) => {
  const navigate = useNavigate();
  const [interiorList, setInteriorList] = useState([]);

  const moveRegister = () => {
    navigate('/interiorRegister');
  };

  useEffect(() => {
    axios
      .get(`${url}/interiorList?possibleLocation=${loc}`)
      .then((res) => {
        console.log(res.data);
        setInteriorList([...res.data.interiorList]);
      })
      .catch((error) => {
        console.error(error);
        setInteriorList([]);
      });
  }, [loc]);

  // useEffect(() => {
  //   if (filterCategory === '전체') {
  //     setFilteredList(interiorList);
  //   } else {
  //     const filtered = interiorList.filter(
  //       (interior) => interior.possibleLocation === filterCategory
  //     );
  //     setFilteredList(filtered);
  //     console.log(filterCategory);
  //   }
  // }, [filterCategory, interiorList]);

  return (
    <div className="companyPage">
      <div className="topBar" style={{ marginBottom: '30px' }}>
        시공업체
        <button id="btn" onClick={moveRegister}>
          등록하기
        </button>
      </div>
      <Card interiorList={interiorList} />
    </div>
  );
};

export default List;
