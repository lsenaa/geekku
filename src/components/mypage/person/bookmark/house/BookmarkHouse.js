import styles from './BookmarkHouse.module.scss';
import { Link } from 'react-router-dom';
import bookmarkImg from 'assets/images/bookmarkTrue.png';
import { useAtomValue } from 'jotai';
import { tokenAtom } from 'store/atoms';
import { axiosInToken, url } from 'lib/axios';
import { useEffect, useState } from 'react';
import { formatEstateType, formatPrice } from 'utils/utils';
import { Modal } from 'antd';
import useInfiniteScroll from 'hook/useInfiniteScroll';

const BookmarkHouse = () => {
  const token = useAtomValue(tokenAtom);
  const [page, setPage] = useState(1);
  const [bookmarkData, setBookmarkData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = async (page) => {
    await axiosInToken(token)
      .get(`/user/mypagebookmarkEstate?page=${page}`)
      .then((res) => {
        console.log(res.data);

        if (res.data.content.length === 0) {
          setHasMore(false);
        } else {
          setHasMore(true);
          setBookmarkData((prev) => [...prev, ...res.data.content]);
          setTotalPages(res.data.totalPages);
          if (page === res.data.totalPages) {
            setHasMore(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setHasMore(false);
      });
  };

  const handleBookmark = (estateNum) => {
    axiosInToken(token)
      .post(`/user/estateBookmark/${estateNum}`)
      .then((res) => {
        if (!res.data) {
          Modal.success({
            content: '매물 북마크가 해제되었습니다.',
          });
          fetchData(page);
        }
      })
      .catch((err) => {
        console.log(err);
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
        {bookmarkData.length === 0 ? (
          <div style={{ margin: '0 auto' }}>매물 북마크 내역이 없습니다.</div>
        ) : (
          <>
            {bookmarkData.map((estate, i) => (
              <li key={i}>
                <Link to={'#'}>
                  <div className={styles.imgWrapper}>
                    <img
                      src={
                        estate.estateImageNums &&
                        `${url}/estateImage/${estate.estateImageNums.split(',')[0]}`
                      }
                      alt="매물 이미지"
                    />
                  </div>
                  <div className={styles.textWrapper}>
                    <p className={styles.type}>
                      {formatEstateType(estate.type)}
                    </p>
                    <p className={styles.price}>
                      {formatPrice({
                        jeonsePrice: estate.jeonsePrice,
                        monthlyPrice: estate.monthlyPrice,
                        depositPrice: estate.depositPrice,
                        buyPrice: estate.buyPrice,
                      })}
                    </p>
                    <div className={styles.locSizeWrapper}>
                      <p>{estate.jibunAddress}</p>
                      <p>
                        {estate.size2}㎡({estate.size1}평)
                      </p>
                    </div>
                    <div className={styles.bookmarkWrap}>
                      <p>{estate.title}</p>
                      <img
                        src={bookmarkImg}
                        alt="북마크 이미지"
                        onClick={(e) => {
                          e.stopPropagation;
                          handleBookmark(estate.estateNum);
                        }}
                      />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </>
        )}
      </ul>
      {hasMore && <div ref={elementRef}></div>}
    </>
  );
};

export default BookmarkHouse;
