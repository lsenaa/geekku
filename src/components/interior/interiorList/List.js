import './List.css';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { url } from 'lib/axios';
import axios from 'axios';
import { useAtom, useAtomValue } from 'jotai';
import { userAtom } from 'store/atoms';

const List = ({ loc, setLoc }) => {
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
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

  // const notRegisteredCompany = interiorList.filter((interior) => {
  //   if (interior.companyId !== user.companyId) {
  //     return user.companyId;
  //   }
  // });
  // console.log('------------' + notRegisteredCompany);
  // console.log(notRegisteredCompany.companyId);
  return (
    <div className="companyPage">
      <div className="topBar" style={{ marginBottom: '30px' }}>
        시공업체
        {/* {interiorList.some(
          (interior) =>
            !interior.regStatus && (
              <button id="btn" onClick={moveRegister}>
                등록하기
              </button>
            )
        )} */}
        {!user.regStatus && (
          <button id="btn" onClick={moveRegister}>
            등록하기
          </button>
        )}
      </div>
      <Card interiorList={interiorList} />
    </div>
  );
};

export default List;
