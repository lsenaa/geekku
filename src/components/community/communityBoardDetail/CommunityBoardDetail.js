import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CommunityBoardDetail.module.css';
import { useNavigate, useParams } from 'react-router';
import { FaUserCircle, FaTrashAlt } from 'react-icons/fa';
import { axiosInToken, url } from 'lib/axios';
import { tokenAtom, userAtom } from 'store/atoms';
import { useAtomValue } from 'jotai';
import { Modal, message } from 'antd';
import bookmarkTrue from 'assets/images/bookmarkTrue.png';
import bookmarkFalse from 'assets/images/bookmarkFalse.png';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { formatDate } from 'utils/utils';

const CommunityBoardDetail = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
  const { CommunityNum } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const user = useAtomValue(userAtom);
  const token = useAtomValue(tokenAtom);

  /** 효과 상태 저장 state */
  const [deletingComments, setDeletingComments] = useState(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBookmarkAnimating, setIsBookmarkAnimating] = useState(false);

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
    if (!CommunityNum) {
      console.error('해당 페이지를 찾을 수 없습니다.');
      return;
    }

    const fetchPostData = () => {
      axios
        .post(`${url}/communityDetail/${CommunityNum}`, {
          userId: user?.userId || '1f95ebff-7367-4386-b04b-bd8b57697dc0',
        })
        .then((res) => {
          setPost(res.data.communityDetail);
          if (Array.isArray(res.data.commentList)) {
            setComments(res.data.commentList);
          } else {
            console.error(res.data.commentList);
            setComments([]); // 기본값으로 빈 배열 설정
          }
          //console.log(res.data.commentList);
          if (user?.userId || user?.companyId) {
            setIsBookmarked(res.data.bookmark);
            setIsOwner(user.userId === res.data.communityDetail.userId);
          } else {
            console.error('현재 로그인된 사용자가 없습니다.');
            setIsOwner(false);
          }
        })
        .catch((err) => {
          console.error(err);
          setComments([]);
        });
    };

    fetchPostData();
  }, [CommunityNum, user]);

  const handleBackButton = () => {
    navigate('/CommunityMain');
  };

  const handleWriteButton = () => {
    navigate('/CommunityBoardWrite');
  };

  const handleEditButtonClick = () => {
    navigate(`/communityBoardEdit/${CommunityNum}`);
  };

  const handleBookmarkClick = async () => {
    if (!user?.userId) {
      if (user?.type === 'estate' || user?.type === 'interior') {
        Modal.info({
          content: '일반 회원만 이용 가능합니다.',
        });
      } else {
        Modal.info({
          content: '로그인한 회원만 가능합니다.',
        });
      }
      return;
    }

    try {
      // **애니메이션 트리거**
      setIsBookmarkAnimating(true);

      // **애니메이션 지속 시간 (0.3초) 동안 대기**
      await new Promise((resolve) => setTimeout(resolve, 300));

      const response = await axiosInToken(token).post(
        `${url}/user/communityBookmark?communityNum=${CommunityNum}`,
        {
          userId: user.userId,
        }
      );

      if (response.status === 200) {
        setIsBookmarked(!isBookmarked);
        // isBookmarked
        //   ? Modal.success({
        //       content: '북마크가 해제되었습니다.',
        //     })
        //   : Modal.success({
        //       content: '북마크가 완료되었습니다.',
        //     });
      } else {
        console.error('북마크 상태 변경 실패:', response.data);
      }
    } catch (error) {
      openModal('기업 회원은 북마크를 등록할 수 없습니다.');
    } finally {
      // **애니메이션 상태 해제**
      setIsBookmarkAnimating(false);
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!user?.userId && !user?.companyId) {
      openModal(
        '로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?',
        () => {
          navigate('/login');
        }
      );
      return;
    }

    // 댓글 내용 확인
    if (newComment.trim()) {
      try {
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 300));
        const response = await axiosInToken(token).post(
          `${url}/user/communityCommentWrite`,
          null,
          {
            params: {
              communityId: CommunityNum,
              userId: user.userId,
              content: newComment,
            },
          }
        );

        //console.log('댓글 작성 응답 데이터:', response.data);

        if (response.status === 201) {
          if (Array.isArray(response.data)) {
            setComments(response.data);
            setNewComment('');
            message.success('댓글이 등록되었습니다.');
          } else {
            console.error('댓글 작성 응답이 배열이 아닙니다:', response.data);
            message.error(
              '댓글 작성 후 데이터를 불러오는 데 문제가 발생했습니다.'
            );
          }
        } else {
          console.error('댓글 작성 실패:', response.data);
          message.error('댓글 작성에 실패했습니다.');
        }
      } catch (error) {
        if (user.type === 'estate' || user.type === 'interior') {
          openModal('기업 회원은 댓글을 작성할 수 없습니다.');
          return;
        } else {
          console.error('댓글 작성 중 에러 발생:', error);
          message.error('댓글 작성 중 오류가 발생했습니다.');
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = (commentNum) => {
    //console.log('Deleting comment with Num:', commentNum);
    if (!commentNum) {
      message.error('유효하지 않은 댓글 번호입니다.');
      return;
    }

    Modal.confirm({
      title: '댓글 삭제',
      content: '정말로 이 댓글을 삭제하시겠습니까?',
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk: async () => {
        try {
          const response = await axiosInToken(token).delete(
            `${url}/user/commentDelete/${commentNum}`,
            {
              data: { userId: user.userId },
            }
          );

          if (response.status === 200) {
            setComments(
              comments.filter((comment) => comment.commentNum !== commentNum)
            );
            message.success('댓글이 삭제되었습니다.');
          } else {
            console.error('댓글 삭제 실패:', response.data);
            message.error('댓글 삭제에 실패했습니다.');
          }
        } catch (error) {
          console.error('댓글 삭제 중 에러 발생:', error);
          message.error('댓글 삭제 중 오류가 발생했습니다.');
        }
      },
    });
  };

  const handleDeleteWithAnimation = (commentNum) => {
    //console.log('Triggering animation for commentNum:', commentNum);
    setDeletingComments((prev) => new Set(prev).add(commentNum));
    setTimeout(() => {
      setDeletingComments((prev) => {
        const newSet = new Set(prev);
        newSet.delete(commentNum);
        return newSet;
      });

      handleDeleteComment(commentNum);
    }, 300);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* 상단 이미지 */}
      <div className={styles.postImageContainer}>
        <img
          src={`${url}/communityImage/${post.coverImage}`}
          alt="상세 이미지"
          className={styles.postImage}
        />
      </div>

      <Modal
        open={modalState.isOpen}
        onCancel={closeModal}
        footer={[
          <button
            key="confirm"
            onClick={() => {
              if (modalState.action) {
                modalState.action();
              }
              closeModal();
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

      <div className={styles.postDetailContainer}>
        {/* 게시글 헤더 */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>{post.title}</div>
        </div>

        {/* 유저 정보 섹션 */}
        <div className={styles.userSection}>
          <div className={styles.userInfo}>
            <div className={styles.profileImg}>
              <img
                src={`data:image/png;base64,${post.profileImage}`}
                alt="프로필이미지"
              />
            </div>
            <span className={styles.username}>
              {post.nickname ? post.nickname : post.name}
            </span>
            <span className={styles.commentDate}>{post.date}</span>
          </div>
          <div className={styles.actions}>
            {isOwner ? (
              <button
                className={styles.editButton}
                onClick={handleEditButtonClick}
              >
                수정하기
              </button>
            ) : (
              <>
                {user.userId && (
                  <button
                    className={
                      isBookmarked
                        ? `${styles.bookmarkedButton} ${isBookmarkAnimating ? styles.pop : ''}`
                        : `${styles.bookmarkButton} ${isBookmarkAnimating ? styles.pop : ''}`
                    }
                    onClick={handleBookmarkClick}
                    type="button" // 버튼 타입 명시
                    aria-label={isBookmarked ? '북마크 됨' : '북마크'}
                  >
                    <div className={styles.bookmarkIcon}>
                      <img
                        src={isBookmarked ? bookmarkTrue : bookmarkFalse}
                        alt="북마크"
                      />
                    </div>
                    <span className={styles.bookmarkText}>
                      {isBookmarked ? '북마크 됨' : '북마크'}
                    </span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* 게시글 상세 정보 카드 */}
        <div className={styles.detailsCard}>
          <div className={styles.detailsIcons}>
            <div className={styles.iconItem}>🏠 {post.type}</div>
            <div className={styles.iconItem}>📐 {post.size}</div>
            <div className={styles.iconItem}>✏️ {post.style}</div>
            <div className={styles.iconItem}>👫 {post.familyType}</div>
          </div>
          <hr className={styles.line} />
          <div className={styles.detailContent}>
            지역: {post.address1} {post.address2} &nbsp;&nbsp;|&nbsp;&nbsp;
            스타일: {post.style} &nbsp;&nbsp;|&nbsp;&nbsp; 예산: {post.money}
            &nbsp;&nbsp; |&nbsp;&nbsp; 기간: {post.periodStartDate} ~{' '}
            {post.periodEndDate}
          </div>
        </div>

        {/* 게시글 내용 */}
        <div className={styles.postContent}>
          <Viewer initialValue={post.content} />
        </div>

        {/* 댓글 섹션 */}
        <div className={styles.commentsSection}>
          <div className={styles.comment}>댓글</div>
          <div className={styles.commentInput}>
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="댓글을 작성해주세요"
              maxLength={500}
              className={styles.textArea}
            />
            <button
              onClick={handleCommentSubmit}
              className={`${styles.submitButton} ${isSubmitting ? styles.pop : ''}`}
              type="button"
              aria-label="댓글 작성"
            >
              작성하기
            </button>
          </div>
          <div className={styles.commentOutput}>
            <div className={styles.commentsList}>
              {Array.isArray(comments) && comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.commentNum} className={styles.commentItem}>
                    <div className={styles.commentHeader}>
                      <FaUserCircle color="#6D885D" size={30} />
                      <span className={styles.commentUsername}>
                        {comment.userNickname
                          ? comment.userNickname
                          : comment.userName}
                      </span>
                      <span className={styles.commentDate}>
                        {formatDate(comment.createdAt)}
                      </span>
                      {user.userId === comment.userId && (
                        <button
                          type="button"
                          className={`${styles.deleteButton} ${
                            deletingComments.has(comment.commentNum)
                              ? styles.pop
                              : ''
                          }`}
                          onClick={() =>
                            handleDeleteWithAnimation(comment.commentNum)
                          }
                          title="댓글 삭제"
                          aria-label="댓글 삭제"
                        >
                          삭제
                        </button>
                      )}
                    </div>
                    <p className={styles.commentContent}>{comment.content}</p>
                  </div>
                ))
              ) : (
                <p style={{ marginTop: '50px' }}>댓글이 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityBoardDetail;
