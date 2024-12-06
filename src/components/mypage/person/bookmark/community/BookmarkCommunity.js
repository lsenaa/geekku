import styles from './BookmarkCommunity.module.scss';
import { Link } from 'react-router-dom';
import bookmarkImg from 'assets/images/bookmarkTrue.png';
import { tokenAtom } from 'store/atoms';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { axiosInToken, url } from 'lib/axios';
import useInfiniteScroll from 'hook/useInfiniteScroll';
import { Modal } from 'antd';
import TopButton from 'components/layout/topbutton/TopButton';

const BookmarkCommunity = () => {
  const token = useAtomValue(tokenAtom);
  const [page, setPage] = useState(1);
  const [bookmarkData, setBookmarkData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData(page);
  }, [page, token]);

  const fetchData = async (page) => {
    await axiosInToken(token)
      .get(`/user/mypagebookmarkCommunity?page=${page}`)
      .then((res) => {
        console.log(res.data.content);

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

  const handleBookmark = (num) => {
    axiosInToken(token)
      .get(`/user/communityBookmark/${num}`)
      .then((res) => {
        if (!res.data) {
          Modal.success({
            content: '집들이 북마크가 해제되었습니다.',
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
          <div style={{ margin: '0 auto' }}>집들이 북마크 내역이 없습니다.</div>
        ) : (
          <>
            {bookmarkData.map((community, i) => (
              <li key={i}>
                <Link to={`/communityBoardDetail/${community.communityNum}`}>
                  <div className={styles.imgWrapper}>
                    <img
                      src={`${url}/communityImage/${community.coverImage}`}
                      alt="집들이 이미지"
                    />
                  </div>
                  <div className={styles.contentWrapper}>
                    <p className={styles.title}>{community.title}</p>
                    <div className={styles.bookmarkWrap}>
                      <div className={styles.userWrap}>
                        <div className={styles.profileImgWrap}>
                          <img
                            src={`data:image/png;base64, ${community.profileImage}`}
                          />
                        </div>
                        <p>
                          {community.nickname !== ''
                            ? community.nickname
                            : community.name}
                        </p>
                      </div>
                      <img
                        src={bookmarkImg}
                        alt="북마크 이미지"
                        onClick={(e) => {
                          e.stopPropagation;
                          handleBookmark(community.communityNum);
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
      <TopButton />
    </>
  );
};

export default BookmarkCommunity;
