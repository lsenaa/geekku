import styles from './MypageInteriorCase.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { tokenAtom } from 'store/atoms';
import { axiosInToken, url } from 'lib/axios';
import useInfiniteScroll from 'hook/useInfiniteScroll';
import Button01 from 'components/commons/button/Button01';
import { Modal } from 'antd';

const MypageInteriorCase = () => {
  const navigate = useNavigate();
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
        console.log(res.data);

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
        console.log(err);
        setHasMore(false);
      });
  };

  const handleDelete = async (sampleNum) => {
    Modal.confirm({
      content: '시공사례 작성글을 삭제하시겠습니까?',
      okText: '삭제',
      cancelText: '취소',
      okButtonProps: {
        style: {
          backgroundColor: '#6d885d',
          borderColor: 'none',
          color: 'white',
        },
      },
      cancelButtonProps: {
        style: {
          backgroundColor: 'transparent',
          borderColor: '#6d885d',
          color: '#6d885d',
        },
      },
      onOk: () => {
        try {
          const res = axiosInToken(token).delete(
            `/company/interiorSampleDelete/${sampleNum}`
          );

          setSampleData((prevData) =>
            prevData.filter((sample) => sample.sampleNum !== sampleNum)
          );
        } catch (error) {
          console.error('시공사례 삭제 중 오류 발생:', error);
        }
      },
      onCancel: () => {
        console.log('Cancel');
      },
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
          <div style={{ margin: '0px auto' }}>등록한 시공사례가 없습니다.</div>
        ) : (
          <>
            {sampleData.map((sample, i) => (
              <li key={i}>
                <div className={styles.imgWrapper}>
                  <img
                    src={`${url}/sampleImage/${sample.coverImage}`}
                    alt="인테리어 업체 이미지"
                  />
                </div>
                <div className={styles.textWrapper}>
                  <p className={styles.title}>{sample.title}</p>
                  <p className={styles.name}>{sample.companyName}</p>
                </div>
                <div className={styles.btnWrapper}>
                  <Button01
                    size="x-small"
                    color="sub"
                    onClick={(e) => {
                      navigate(`/sampleDetail/${sample.sampleNum}`);
                    }}
                  >
                    상세보기
                  </Button01>
                  <br />
                  <br />
                  <Button01
                    size="x-small"
                    onClick={(e) => {
                      handleDelete(sample.sampleNum);
                    }}
                  >
                    삭제
                  </Button01>
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
      {hasMore && <div ref={elementRef}></div>}
    </>
  );
};

export default MypageInteriorCase;
