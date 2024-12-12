import styles from './MypageInteriorCase.module.scss';
import { Link } from 'react-router-dom';
import interiorImg from 'assets/images/InteriorExam.jpg';
import Button01 from 'components/commons/button/Button01';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { tokenAtom } from 'store/atoms';
import { axiosInToken } from 'lib/axios';
import useInfiniteScroll from 'hook/useInfiniteScroll';
import { Modal } from 'antd';
import TopButton from 'components/layout/topbutton/TopButton';

const MypageInteriorCase = () => {
  const token = useAtomValue(tokenAtom);
  const [page, setPage] = useState(1);
  const [sampleData, setSampleData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData(page);
  }, [page, token]);

  const fetchData = async (page) => {
    await axiosInToken(token)
      .get(`/company/myInteriorSampleList?page=${page}`)
      .then((res) => {
        //console.log(res.data);

        if (res.data.estateList.length === 0) {
          setHasMore(false);
        } else {
          setHasMore(true);
          setSampleData((prev) => [...prev, ...res.data.estateList]);
          setTotalPages(res.data.totalPages);
          if (page === res.data.totalPages) {
            setHasMore(false);
          }
        }
      })
      .catch((err) => {
        console.error(err);
        setHasMore(false);
      });
  };
  const elementRef = useInfiniteScroll(async (entry, observer) => {
    if (hasMore && totalPages !== page) {
      setPage((prev) => prev + 1);
    }
  });
  return (
    <>
      <ul className={styles.bookmarkContainer}>
        {sampleData.length === 0 ? (
          <div style={{ margin: '0 auto' }}>등록한 시공사례가 없습니다.</div>
        ) : (
          <>
            {sampleData.map((sample, i) => (
              <li key={i}>
                <Link to={`/sampleDetail/${sample.sampleNum}`}>
                  <div className={styles.imgWrapper}>
                    <img
                      src={`data:image/png;base64, ${sample.interiorImageStr}`}
                      alt="인테리어 업체 이미지"
                    />
                  </div>
                  <div className={styles.contentWrapper}>
                    <p className={styles.name}>{sample.title}</p>
                    <div className={styles.textWrapper}>
                      <p className={styles.name}>{sample.companyName}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </>
        )}
      </ul>
      {hasMore && <div ref={elementRef}></div>}
      <TopButton />
    </>
  );
};

export default MypageInteriorCase;
