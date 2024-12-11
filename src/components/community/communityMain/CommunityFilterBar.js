import React, { useState, useEffect } from 'react';
import styles from './CommunityFilterBar.module.css';
import { useAtomValue } from 'jotai';
import { userAtom } from 'store/atoms';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
// import BannerImage from 'assets/images/CBanner.png';

const CommunityFilterBar = ({
  communityList,
  setCommunityList,
  filters,
  onFilterChange,
  totalElements,
}) => {
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const [filterAction, setFilterAction] = useState(null);

  const [dropdownVisible, setDropdownVisible] = useState({
    type: false,
    sizeRange: false,
    familyType: false,
    style: false,
    period: false,
    moneyRange: false,
  });

  const [localFilters, setLocalFilters] = useState(filters);

  const [modalState, setModalState] = useState({
    isOpen: false,
    message: '',
    action: null,
  });

  const openModal = (message, action = null) => {
    setModalState({
      isOpen: true,
      message,
      action,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      message: '',
      action: null,
    });
  };

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    if (!value) {
      setFilterAction('remove');
    } else if (localFilters[key] === null || !localFilters[key]) {
      setFilterAction('add');
    } else {
      setFilterAction('update');
    }

    const newFilters = {
      ...localFilters,
      [key]: value,
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
    setTimeout(() => setFilterAction(null), 300);
  };

  const [isResetting, setIsResetting] = useState(false);
  const resetFilters = () => {
    setIsResetting(true);
    setTimeout(() => {
      setIsResetting(false);
      const newFilters = {
        type: null,
        sizeRange: null,
        familyType: null,
        style: null,
        period: null,
        moneyRange: null,
      };
      setLocalFilters(newFilters);
      onFilterChange(newFilters);
    }, 300);
  };

  const toggleDropdown = (key) => {
    setDropdownVisible((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleCommunityBoardWrite = () => {
    if (user?.userId) {
      navigate('/CommunityBoardWrite');
    } else if (user.companyId) {
      Modal.info({
        content: '일반회원만 이용가능합니다.',
      });
    } else {
      Modal.info({
        content: '로그인 후 이용가능합니다.',
      });
      navigate('/login');
    }
  };

  return (
    <>
      {/* <div className={styles.banner}>
        <img src={BannerImage} alt="Banner" className={styles.bannerImage} />
      </div> */}

      <div className={styles.filterContainer}>
        <div className={styles.filterBar}>
          <h2 className={styles.boardTitle}>집들이 게시판</h2>

          {/* 주거 형태 필터 */}
          <div
            className={styles.filterButtonWrapper}
            onMouseEnter={() => toggleDropdown('type')}
            onMouseLeave={() => toggleDropdown('type')}
          >
            <button className={styles.filterButton}>주거 형태</button>
            {dropdownVisible.type && (
              <div className={styles.dropdown} style={{ width: '100%' }}>
                <div onClick={() => handleFilterChange('type', '아파트')}>
                  아파트
                </div>
                <div onClick={() => handleFilterChange('type', '빌라')}>
                  빌라
                </div>
                <div
                  onClick={() => handleFilterChange('type', '시골 농가 주택')}
                >
                  시골 농가
                </div>
                <div onClick={() => handleFilterChange('type', '전원 주택')}>
                  전원 주택
                </div>
              </div>
            )}
          </div>

          {/* 스타일 필터 */}
          <div
            className={styles.filterButtonWrapper}
            onMouseEnter={() => toggleDropdown('style')}
            onMouseLeave={() => toggleDropdown('style')}
          >
            <button className={styles.filterButton}>스타일</button>
            {dropdownVisible.style && (
              <div
                className={styles.dropdown}
                style={{
                  width: '250%',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '10px',
                  borderTopRightRadius: '25px',
                }}
              >
                <div onClick={() => handleFilterChange('style', '모던')}>
                  모던
                </div>
                <div onClick={() => handleFilterChange('style', '미니멀&심플')}>
                  미니멀&심플
                </div>
                <div onClick={() => handleFilterChange('style', '내추럴')}>
                  내추럴
                </div>
                <div onClick={() => handleFilterChange('style', '북유럽')}>
                  북유럽
                </div>
                <div
                  onClick={() => handleFilterChange('style', '빈티지&레트로')}
                >
                  빈티지&레트로
                </div>
                <div onClick={() => handleFilterChange('style', '클래식&앤틱')}>
                  클래식&앤틱
                </div>
                <div
                  onClick={() => handleFilterChange('style', '프랜치&프로방스')}
                >
                  프랜치&프로방스
                </div>
                <div
                  onClick={() => handleFilterChange('style', '러블리&로맨틱')}
                >
                  러블리&로맨틱
                </div>
                <div
                  onClick={() => handleFilterChange('style', '인더스트리얼')}
                >
                  인더스트리얼
                </div>
                <div onClick={() => handleFilterChange('style', '한국&아시아')}>
                  한국&아시아
                </div>
                <div
                  onClick={() => handleFilterChange('style', '유니크&믹스매치')}
                >
                  유니크&믹스매치
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.selectedFilters}>
          {/* 필터 태그 */}
          {Object.entries(localFilters).map(([key, value]) =>
            value ? (
              <span
                key={key}
                className={`${styles.filterTag} ${filterAction === 'add' ? styles.pop : ''} ${
                  filterAction === 'update' ? styles.update : ''
                } ${filterAction === 'remove' ? styles.remove : ''}`}
                data-key={key}
              >
                {value}{' '}
                <button
                  onClick={() => handleFilterChange(key, null)}
                  className={styles.filterRemoveButton}
                >
                  X
                </button>
              </span>
            ) : null
          )}

          {/* 초기화 버튼 */}
          <button
            onClick={resetFilters}
            className={`${styles.resetButton} ${isResetting ? styles.pop : ''}`}
          >
            초기화
          </button>
        </div>

        <div className={styles.filterHeader}>
          {/* totalElements를 표시 (전체 개수) */}
          <span className={styles.totalCount}>전체 {totalElements}</span>
          <button
            className={styles.registerButton}
            onClick={handleCommunityBoardWrite}
          >
            등록하기
          </button>
        </div>
        <Modal
          open={modalState.isOpen}
          onCancel={closeModal} // 모달 닫기
          footer={[
            <button
              key="confirm"
              onClick={() => {
                if (modalState.action) {
                  modalState.action(); // 지정된 동작 실행
                }
                closeModal(); // 모달 닫기
              }}
              style={{
                width: '80px',
                height: '30px',
                borderRadius: '5px',
                backgroundColor: '#6d885d',
                color: '#ffffff',
              }}
            >
              확인
            </button>,
          ]}
        >
          <p>{modalState.message}</p>
        </Modal>
      </div>
    </>
  );
};

export default CommunityFilterBar;
