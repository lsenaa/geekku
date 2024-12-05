import React, { useState } from 'react';
import styles from './Filter.module.scss';
import { Modal } from 'antd';
import CustomLocFilter from './CustomLocFilter';

const Filter = ({ setSampleList, filterSample }) => {
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
  const handleCheckboxChange = (e) => {
    setSelectedTypes((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((type) => type !== e.target.value)
        : [...prev, e.target.value]
    );
  };

  //스타일순
  const [selectedStyles, setSelectedStyles] = useState([]);

  //평수순
  const [selectedSizes, setSelectedSizes] = useState([]);

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
                onChange={handleCheckboxChange}
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
                onChange={handleCheckboxChange}
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
                onChange={handleCheckboxChange}
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
                color: selectedTypes.includes('모던') ? '#6D885D' : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="모던"
                checked={selectedTypes.includes('모던')}
                onChange={handleCheckboxChange}
                style={{ display: 'none' }}
              />
              모던
            </label>
          </span>
          <span className={styles.spanStyle} id={styles.detail}>
            <label
              style={{
                color: selectedTypes.includes('우드') ? '#6D885D' : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="우드"
                checked={selectedTypes.includes('우드')}
                onChange={handleCheckboxChange}
                style={{ display: 'none' }}
              />
              우드
            </label>
          </span>
          <span className={styles.spanStyle} id={styles.detail}>
            <label
              style={{
                color: selectedTypes.includes('내추럴') ? '#6D885D' : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="내추럴"
                checked={selectedTypes.includes('내추럴')}
                onChange={handleCheckboxChange}
                style={{ display: 'none' }}
              />
              내추럴
            </label>
          </span>
          <span className={styles.spanStyle} id={styles.detail}>
            <label
              style={{
                color: selectedTypes.includes('클래식&엔틱')
                  ? '#6D885D'
                  : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="클래식&엔틱"
                checked={selectedTypes.includes('클래식&엔틱')}
                onChange={handleCheckboxChange}
                style={{ display: 'none' }}
              />
              클래식&엔틱
            </label>
          </span>
          <span className={styles.spanStyle} id={styles.detail}>
            <label
              style={{
                color: selectedTypes.includes('레트로&빈티지')
                  ? '#6D885D'
                  : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="레트로&빈티지"
                checked={selectedTypes.includes('레트로&빈티지')}
                onChange={handleCheckboxChange}
                style={{ display: 'none' }}
              />
              레트로&빈티지
            </label>
          </span>
          <span className={styles.spanStyle} id={styles.detail}>
            <label
              style={{
                color: selectedTypes.includes('미니멀') ? '#6D885D' : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="미니멀"
                checked={selectedTypes.includes('미니멀')}
                onChange={handleCheckboxChange}
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
                color: selectedTypes.includes('10평미만')
                  ? '#6D885D'
                  : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="10평미만"
                checked={selectedTypes.includes('10평미만')}
                onChange={handleCheckboxChange}
                style={{ display: 'none' }}
              />
              10평미만
            </label>
          </span>
          <span className={styles.spanStyle}>
            <label
              style={{
                color: selectedTypes.includes('10평대') ? '#6D885D' : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="10평대"
                checked={selectedTypes.includes('10평대')}
                onChange={handleCheckboxChange}
                style={{ display: 'none' }}
              />
              10평대
            </label>
          </span>
          <span className={styles.spanStyle}>
            <label
              style={{
                color: selectedTypes.includes('20평대') ? '#6D885D' : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="20평대"
                checked={selectedTypes.includes('20평대')}
                onChange={handleCheckboxChange}
                style={{ display: 'none' }}
              />
              20평대
            </label>
          </span>
          <span className={styles.spanStyle}>
            <label
              style={{
                color: selectedTypes.includes('30평대') ? '#6D885D' : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="30평대"
                checked={selectedTypes.includes('30평대')}
                onChange={handleCheckboxChange}
                style={{ display: 'none' }}
              />
              30평대
            </label>
          </span>
          <span className={styles.spanStyle}>
            <label
              style={{
                color: selectedTypes.includes('40평대') ? '#6D885D' : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="40평대"
                checked={selectedTypes.includes('40평대')}
                onChange={handleCheckboxChange}
                style={{ display: 'none' }}
              />
              40평대
            </label>
          </span>
          <span className={styles.spanStyle}>
            <label
              style={{
                color: selectedTypes.includes('50평대') ? '#6D885D' : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="50평대"
                checked={selectedTypes.includes('50평대')}
                onChange={handleCheckboxChange}
                style={{ display: 'none' }}
              />
              50평대
            </label>
          </span>
          <span className={styles.spanStyle}>
            <label
              style={{
                color: selectedTypes.includes('50평대이상')
                  ? '#6D885D'
                  : '#abaaaa',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                value="50평대이상"
                checked={selectedTypes.includes('50평대이상')}
                onChange={handleCheckboxChange}
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
          <CustomLocFilter />
        </div>
        <button className={styles.totalSearch}>확인</button>
      </Modal>
    </>
  );
};

export default Filter;
