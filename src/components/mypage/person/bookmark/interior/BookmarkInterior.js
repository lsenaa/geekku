import styles from './BookmarkInterior.module.scss';
import bookmarkImg from 'assets/images/bookmarkTrue.png';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { tokenAtom } from 'store/atoms';
import { axiosInToken } from 'lib/axios';
import useInfiniteScroll from 'hook/useInfiniteScroll';
import { message } from 'antd';
import { Link } from 'react-router-dom';

const BookmarkInterior = () => {
  const token = useAtomValue(tokenAtom);
  const [page, setPage] = useState(1);
  const [bookmarkData, setBookmarkData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    fetchData(page);
  }, [page, token]);

  const fetchData = async (page) => {
    await axiosInToken(token)
      .get(`/user/mypagebookmarkInterior?page=${page}`)
      .then((res) => {
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

  const handleBookmark = (num, bookmarkInteriorNum) => {
    axiosInToken(token)
      .get(`/user/interiorBookmark/${num}`)
      .then((res) => {
        console.log(res.data);

        if (!res.data) {
          messageApi.open({
            type: 'success',
            content: '북마크가 해제되었습니다.',
          });
          setBookmarkData(
            bookmarkData.filter(
              (bookmark) => bookmark.bookmarkInteriorNum !== bookmarkInteriorNum
            )
          );
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
          <div style={{ margin: '0 auto' }}>
            인테리어 업체 북마크 내역이 없습니다.
          </div>
        ) : (
          <>
            {bookmarkData.map((interior, i) => (
              <li key={i}>
                <Link to={`/profile/interior/${interior.interiorNum}`}>
                  <div className={styles.imgWrapper}>
                    <img
                      src={`data:image/png;base64, ${interior.interiorImageStr}`}
                      alt="인테리어 업체 이미지"
                    />
                  </div>
                  <div className={styles.contentWrapper}>
                    <div className={styles.textWrapper}>
                      <p className={styles.name}>{interior.companyName}</p>
                      <div className={styles.locationWrap}>
                        {interior.possibleLocation
                          .split(',')
                          .map((location) => (
                            <p className={styles.loc} key={location}>
                              {location}
                            </p>
                          ))}
                      </div>
                    </div>
                    <div className={styles.bookmarkWrap}>
                      <p className={styles.type}>
                        {interior.possiblePart
                          ? '전체시공/부분시공'
                          : '전체시공'}
                      </p>
                      <img
                        src={bookmarkImg}
                        alt="북마크 이미지"
                        onClick={(e) => {
                          e.preventDefault();
                          handleBookmark(
                            interior.interiorNum,
                            interior.bookmarkInteriorNum
                          );
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
      {contextHolder}
    </>
  );
};

export default BookmarkInterior;
