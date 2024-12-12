import styles from './EstateSearch.module.scss';
import { useEffect, useState } from 'react';
import EstateList from '../estateList/EstateList';
import KakaoMap from 'components/kakaomap/KakaoMap';
import axios from 'axios';
import { url } from 'lib/axios';
import { useLocation } from 'react-router';
import { CiLocationOn } from 'react-icons/ci';
import { searchByKeyword } from 'utils/utils';
import { useDebounce } from 'hook/useDebounce';

const EstateSearch = () => {
  const location = useLocation();
  const [keyword, setKeyword] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [estateList, setEstateList] = useState([]);
  const [isOpenResults, setIsOpenReseults] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const searchResults = searchByKeyword(searchInput);
  const debouncedKeyword = useDebounce(keyword, 1000); //200ms로 설정된 debounce
  const DEFAULT_KEYWORD = '경기도 광명시'; // 초기 키워드
  const DEFAULT_COORDS = { latitude: 37.47832, longitude: 126.864303 }; // 초기 키워드  좌표

  // 초기 마운트 시 mainKeyword 설정
  useEffect(() => {
    if (!keyword) {
      const mainKeyword = location.state?.keyword || DEFAULT_KEYWORD;
      setKeyword(mainKeyword);
      fetchData(mainKeyword, type, page);
    }
  }, []);

  // type이나 page가 변경될 때 데이터 fetch
  useEffect(() => {
    if (keyword) {
      fetchData(keyword, type, page);
    }
  }, [keyword, type, page]);

  // 검색어 전처리 함수
  const processKeyword = (keyword) => {
    const replacements = {
      광역시: '',
      경기도: '경기',
      충청북도: '충북',
      충청남도: '충남',
      전라북도: '전북',
      전라남도: '전남',
      경상북도: '경북',
      경상남도: '경남',
    };

    let processedKeyword = keyword || '';
    Object.keys(replacements).forEach((key) => {
      processedKeyword = processedKeyword.replace(key, replacements[key]);
    });

    return processedKeyword.trim();
  };

  const fetchData = async (searchKeyword = '', searchType = '') => {
    const params = {};
    if (searchType) params.type = searchType;
    if (searchKeyword) params.keyword = processKeyword(searchKeyword);
    params.page = page;

    try {
      const res = await axios.get(`${url}/estateList`, { params });
      //console.log(res.data);

      setEstateList([...res.data.estateList]);
      setTotalCount(res.data.pageInfo.totalCount);
    } catch (err) {
      console.error(err);
    }
  };

  // 타입 선택
  const handleType = (type) => {
    setType(type);
    setPage(1);
  };

  // 키워드 입력
  const handleKeywordChange = (e) => {
    setIsOpenReseults((prev) => !prev);
    setSearchInput(e.target.value);
  };

  // 검색 리스트 항목 클릭
  const handleKeywordClick = (selectedKeyword) => {
    setIsOpenReseults((prev) => !prev);
    setSearchInput('');
    setKeyword(selectedKeyword);
    setType('');
    setPage(1);
  };

  // 페이지 변경
  const onChangePage = (value) => {
    setPage(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topWrapper}>
        <ul className={styles.typeSelect}>
          <li
            className={type === 'farmHouse' ? styles.selected : undefined}
            onClick={() => handleType('farmHouse')}
          >
            시골농가주택
          </li>
          <li
            className={type === 'countryHouse' ? styles.selected : undefined}
            onClick={() => handleType('countryHouse')}
          >
            전원주택
          </li>
          <li
            className={type === 'apt' ? styles.selected : undefined}
            onClick={() => handleType('apt')}
          >
            아파트/빌라
          </li>
          <li
            className={type === 'land' ? styles.selected : undefined}
            onClick={() => handleType('land')}
          >
            농장/토지
          </li>
        </ul>
        <div className={styles.searchWrapper}>
          <input
            type="test"
            placeholder="매물을 검색해주세요."
            value={searchInput}
            onChange={handleKeywordChange}
          />
          {/* <button>검색</button> */}
          {searchResults.length !== 0 && isOpenResults && (
            <ul className={styles.searchList}>
              {searchResults.map((search, i) => (
                <li key={i} onClick={() => handleKeywordClick(search)}>
                  <CiLocationOn size="20" />
                  <p>{search}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.bodyWrapper}>
        {estateList.length === 0 ? (
          <div className={styles.noEstate}>등록된 매물 목록이 없습니다.</div>
        ) : (
          <EstateList
            estateList={estateList}
            totalCount={totalCount}
            page={page}
            onChangePage={onChangePage}
          />
        )}
        <KakaoMap
          estateList={estateList}
          currentLocation={DEFAULT_COORDS}
          keyword={processKeyword(keyword)}
        />
      </div>
    </div>
  );
};

export default EstateSearch;
