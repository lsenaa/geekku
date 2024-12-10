import { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import styles from './MypagePersonCommunity.module.scss';
import Button01 from 'components/commons/button/Button01';
import { tokenAtom, userAtom } from 'store/atoms';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { axiosInToken, url } from 'lib/axios';
import { Modal } from 'antd';

const MypagePersonCommunity = () => {
  const [communityData, setCommunityData] = useState([]); // 커뮤니티 목록 상태
  const user = useAtomValue(userAtom); // atom에서 사용자 정보 가져오기
  const navigate = useNavigate();
  const token = useAtomValue(tokenAtom);

  useEffect(() => {
    const fetchCommunityData = async () => {
      if (!user.userId) {
        console.error('로그인된 유저 정보가 없습니다.');
        return;
      }

      try {
        const response = await axios.get(
          `${url}/personCommunities/${user.userId}`
        );
        setCommunityData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('커뮤니티 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchCommunityData();
  }, [user.userId]);

  const handleDelete = async (communityNum) => {
    Modal.confirm({
      content: '집들이 작성글을 삭제하시겠습니까?',
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
          axiosInToken(token).delete(
            `${url}/user/communityDelete/${communityNum}`
          );
          setCommunityData((prevData) =>
            prevData.filter(
              (community) => community.communityNum !== communityNum
            )
          );
        } catch (error) {
          console.error('게시글 삭제 중 오류 발생:', error);
        }
      },
      onCancel: () => {
        console.log('Cancel');
      },
    });
  };

  return (
    <ul className={styles.Container}>
      {communityData.length === 0 ? (
        <div style={{ margin: '0 auto' }}>집들이 작성내역이 없습니다.</div>
      ) : (
        <>
          {communityData.map((community) => (
            <li key={community.communityNum}>
              <div className={styles.imgWrapper}>
                <img
                  src={`${url}/communityImage/${community.coverImage}`}
                  alt="집들이 이미지"
                />
              </div>
              <div className={styles.textWrapper}>
                <p className={styles.title}>{community.title}</p>
                <p className={styles.view}>
                  조회수 {community.viewCount?.toLocaleString() || 0}
                </p>
              </div>
              <div className={styles.contentWrapper}>
                {/* 상세보기 버튼 */}
                <Button01
                  size="x-small"
                  color="sub"
                  onClick={() =>
                    navigate(`/communityBoardDetail/${community.communityNum}`)
                  }
                >
                  상세보기
                </Button01>
                <br />
                <br />
                {/* 삭제 버튼 */}
                <Button01
                  size="x-small"
                  onClick={() => handleDelete(community.communityNum)}
                >
                  삭제
                </Button01>
              </div>
            </li>
          ))}
        </>
      )}
    </ul>
  );
};

export default MypagePersonCommunity;
