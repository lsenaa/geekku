import React, { useState } from 'react';
import styles from './Filter.module.scss';
import { Modal } from 'antd';
import CustomLocFilter from './CustomLocFilter';
import { useNavigate } from 'react-router';

const Filter = ({ onFilter }) => {
  const navigate = useNavigate();

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

  //날짜순
  const [sortDate, setSortDate] = useState('');
  const handleSortChange = (e) => {
    setSortDate(e.target.value);
  };

  //주거형태순
  const [selectedTypes, setSelectedTypes] = useState([]);

  //스타일순
  const [selectedStyles, setSelectedStyles] = useState([]);

  //평수순
  const [selectedSizes, setSelectedSizes] = useState([]);

  //지역순
  const [selectedLoc, setSelectedLoc] = useState([]);

  //체크박스 변경 이벤트
  const handleCheckboxChange = (e, what) => {
    if (what === 'type') {
      setSelectedTypes((prev) =>
        prev.includes(e.target.value)
          ? prev.filter((item) => item !== e.target.value)
          : [...prev, e.target.value]
      );
    } else if (what === 'style') {
      setSelectedStyles((prev) =>
        prev.includes(e.target.value)
          ? prev.filter((item) => item !== e.target.value)
          : [...prev, e.target.value]
      );
    } else if (what === 'size') {
      setSelectedSizes((prev) =>
        prev.includes(e.target.value)
          ? prev.filter((item) => item !== e.target.value)
          : [...prev, e.target.value]
      );
    }
    //console.log(what);
  };
  const submitFilter = () => {
    const newConditions = {
      date: sortDate,
      types: selectedTypes,
      styles: selectedStyles,
      sizes: selectedSizes,
      location: selectedLoc,
    };
    //console.log('test', newConditions);
    onFilter(newConditions);
    handleCancel();
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
          <span className={styles.spanStyle}>
            <label
              style={{
                color: sortDate === 'latest' ? '#6D885D' : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="radio"
                value="latest"
                checked={sortDate === 'latest'}
                onChange={handleSortChange}
                style={{ display: 'none' }}
              />
              최신순
            </label>
          </span>
          <span className={styles.spanStyle}>
            <label
              style={{
                color: sortDate === 'oldest' ? '#6D885D' : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="radio"
                value="oldest"
                checked={sortDate === 'oldest'}
                onChange={handleSortChange}
                style={{ display: 'none' }}
              />
              과거순
            </label>
          </span>
          <hr />
        </div>

        <div className={styles.divStyle}>
          <div className={styles.spanStyle} id={styles.top}>
            주거형태
          </div>
          <span className={styles.spanStyle}>
            <label
              style={{
                color: selectedTypes.includes('농가주택')
                  ? '#6D885D'
                  : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="농가주택"
                checked={selectedTypes.includes('농가주택')}
                onChange={(e) => handleCheckboxChange(e, 'type')}
                style={{ display: 'none' }}
              />
              농가주택
            </label>
          </span>
          <span className={styles.spanStyle}>
            <label
              style={{
                color: selectedTypes.includes('전원주택')
                  ? '#6D885D'
                  : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="전원주택"
                checked={selectedTypes.includes('전원주택')}
                onChange={(e) => handleCheckboxChange(e, 'type')}
                style={{ display: 'none' }}
              />
              전원주택
            </label>
          </span>
          <span className={styles.spanStyle}>
            <label
              style={{
                color: selectedTypes.includes('아파트/빌라')
                  ? '#6D885D'
                  : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="아파트/빌라"
                checked={selectedTypes.includes('아파트/빌라')}
                onChange={(e) => handleCheckboxChange(e, 'type')}
                style={{ display: 'none' }}
              />
              아파트/빌라
            </label>
          </span>
          <hr />
        </div>

        <div className={styles.divStyle}>
          <div className={styles.spanStyle} id={styles.top}>
            스타일
          </div>
          <span className={styles.spanStyle} id={styles.detail}>
            <label
              style={{
                color: selectedStyles.includes('모던') ? '#6D885D' : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="모던"
                checked={selectedStyles.includes('모던')}
                onChange={(e) => handleCheckboxChange(e, 'style')}
                style={{ display: 'none' }}
              />
              모던
            </label>
          </span>
          <span className={styles.spanStyle} id={styles.detail}>
            <label
              style={{
                color: selectedStyles.includes('우드') ? '#6D885D' : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="우드"
                checked={selectedStyles.includes('우드')}
                onChange={(e) => handleCheckboxChange(e, 'style')}
                style={{ display: 'none' }}
              />
              우드
            </label>
          </span>
          <span className={styles.spanStyle} id={styles.detail}>
            <label
              style={{
                color: selectedStyles.includes('내추럴')
                  ? '#6D885D'
                  : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="내추럴"
                checked={selectedStyles.includes('내추럴')}
                onChange={(e) => handleCheckboxChange(e, 'style')}
                style={{ display: 'none' }}
              />
              내추럴
            </label>
          </span>
          <span className={styles.spanStyle} id={styles.detail}>
            <label
              style={{
                color: selectedStyles.includes('클래식&엔틱')
                  ? '#6D885D'
                  : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="클래식&엔틱"
                checked={selectedStyles.includes('클래식&엔틱')}
                onChange={(e) => handleCheckboxChange(e, 'style')}
                style={{ display: 'none' }}
              />
              클래식&엔틱
            </label>
          </span>
          <span className={styles.spanStyle} id={styles.detail}>
            <label
              style={{
                color: selectedStyles.includes('레트로&빈티지')
                  ? '#6D885D'
                  : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="레트로&빈티지"
                checked={selectedStyles.includes('레트로&빈티지')}
                onChange={(e) => handleCheckboxChange(e, 'style')}
                style={{ display: 'none' }}
              />
              레트로&빈티지
            </label>
          </span>
          <span className={styles.spanStyle} id={styles.detail}>
            <label
              style={{
                color: selectedStyles.includes('미니멀')
                  ? '#6D885D'
                  : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="미니멀"
                checked={selectedStyles.includes('미니멀')}
                onChange={(e) => handleCheckboxChange(e, 'style')}
                style={{ display: 'none' }}
              />
              미니멀
            </label>
          </span>
          <hr />
        </div>

        <div className={styles.divStyle}>
          <div className={styles.spanStyle} id={styles.top}>
            평수
          </div>
          <span className={styles.spanStyle}>
            <label
              style={{
                color: selectedSizes.includes('10평미만')
                  ? '#6D885D'
                  : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="10평미만"
                checked={selectedSizes.includes('10평미만')}
                onChange={(e) => handleCheckboxChange(e, 'size')}
                style={{ display: 'none' }}
              />
              10평미만
            </label>
          </span>
          <span className={styles.spanStyle}>
            <label
              style={{
                color: selectedSizes.includes('10평대') ? '#6D885D' : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="10평대"
                checked={selectedSizes.includes('10평대')}
                onChange={(e) => handleCheckboxChange(e, 'size')}
                style={{ display: 'none' }}
              />
              10평대
            </label>
          </span>
          <span className={styles.spanStyle}>
            <label
              style={{
                color: selectedSizes.includes('20평대') ? '#6D885D' : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="20평대"
                checked={selectedSizes.includes('20평대')}
                onChange={(e) => handleCheckboxChange(e, 'size')}
                style={{ display: 'none' }}
              />
              20평대
            </label>
          </span>
          <span className={styles.spanStyle}>
            <label
              style={{
                color: selectedSizes.includes('30평대') ? '#6D885D' : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="30평대"
                checked={selectedSizes.includes('30평대')}
                onChange={(e) => handleCheckboxChange(e, 'size')}
                style={{ display: 'none' }}
              />
              30평대
            </label>
          </span>
          <span className={styles.spanStyle}>
            <label
              style={{
                color: selectedSizes.includes('40평대') ? '#6D885D' : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="40평대"
                checked={selectedSizes.includes('40평대')}
                onChange={(e) => handleCheckboxChange(e, 'size')}
                style={{ display: 'none' }}
              />
              40평대
            </label>
          </span>
          <span className={styles.spanStyle}>
            <label
              style={{
                color: selectedSizes.includes('50평대') ? '#6D885D' : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="50평대"
                checked={selectedSizes.includes('50평대')}
                onChange={(e) => handleCheckboxChange(e, 'size')}
                style={{ display: 'none' }}
              />
              50평대
            </label>
          </span>
          <span className={styles.spanStyle}>
            <label
              style={{
                color: selectedSizes.includes('50평대이상')
                  ? '#6D885D'
                  : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="50평대이상"
                checked={selectedSizes.includes('50평대이상')}
                onChange={(e) => handleCheckboxChange(e, 'size')}
                style={{ display: 'none' }}
              />
              50평대이상
            </label>
          </span>
          <hr />
        </div>

        <div className={styles.divStyle}>
          <div className={styles.spanStyle} id={styles.top}>
            지역
          </div>
          <CustomLocFilter
            selectedLoc={selectedLoc}
            setSelectedLoc={setSelectedLoc}
          />
        </div>
        <button className={styles.totalSearch} onClick={submitFilter}>
          확인
        </button>
      </Modal>
    </>
  );
};

export default Filter;
