import React, { useState } from 'react';
import styles from './CommunityBoardDetail.module.css';
import { useNavigate } from 'react-router';

const CommunityBoardDetail = () => {
    const [post, setPost] = useState({
        title: '홈스타일링 전문가와 함께, 블랙 포인트로 세련되게 완성한 집',
        username: '코스타',
        type: '아파트',
        size: '33평',
        style: '리모델링',
        family: '신혼부부',
        location: '경기도',
        budget: '3000만원',
        period: '1개월',
        scope: '세부공사 주방리모델링, 조명시공, 중문, 가벽&파티션, 슬라이딩 도어',
        content: `거실은 집 안에서 가장 중요한 공간이기 때문에...`,
        imageUrl: require('../../../assets/images/communityExam.png')
    });

    const [comments, setComments] = useState([
        { id: 1, username: '코스타', content: '여기 너무 예쁘네요~ 따라 만들어봐야겠어요!', date: '2024-10-28' }
    ]);
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();
    
    const handleBackButton = () => {
        navigate('/CommunityMain');
    };

    const handleWriteButton = () => {
        navigate('/CommunityBoardWrite');
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            setComments([...comments, { id: comments.length + 1, username: '코스타', content: newComment, date: new Date().toISOString().slice(0, 10) }]);
            setNewComment('');
        }
    };

    return (
        <div>
            {/* 상단 이미지 */}
            <div className={styles.postImageContainer}>
                <img src={post.imageUrl} alt="상세 이미지" className={styles.postImage} />
            </div>

            <div className={styles.postDetailContainer}>
                {/* 게시글 헤더 */}
                <div className={styles.header}>
                    <button className={styles.backButton} onClick={handleBackButton}>←</button>
                    <div className={styles.headerTitle}>{post.title}</div>
                </div>

                {/* 유저 정보 섹션 */}
                <div className={styles.userSection}>
                    <div className={styles.userInfo}>
                        <div className={styles.profileIcon}></div>
                        <span className={styles.username}>{post.username}</span>
                    </div>
                    <div className={styles.actions}>
                        <button className={styles.editButton} onClick={handleWriteButton}>수정하기</button>
                    </div>
                </div>

                {/* 게시글 상세 정보 카드 */}
                <div className={styles.detailsCard}>
                    <div className={styles.detailsIcons}>
                        <div className={styles.iconItem}>🏠 {post.type}</div>
                        <div className={styles.iconItem}>📐 {post.size}</div>
                        <div className={styles.iconItem}>✏️ {post.style}</div>
                        <div className={styles.iconItem}>👫 {post.family}</div>
                    </div>
                    <hr />
                    <div className={styles.detailContent}>지역: {post.location} | 스타일: {post.style} | 예산: {post.budget} | 기간: {post.period}</div>
                    <div className={styles.detailContent}>시공 범위: {post.scope}</div>
                </div>

                {/* 게시글 내용 */}
                <div className={styles.postContent}>
                    <p>{post.content}</p>
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
                        <button onClick={handleCommentSubmit} className={styles.submitButton}>작성하기</button>
                    </div>
                    <div className={styles.commentOutput}>
                        <div className={styles.commentsList}>
                            {comments.map(comment => (
                                <div key={comment.id} className={styles.commentItem}>
                                    <div className={styles.commentHeader} style={{marginBottom:"10px"}}>
                                        <span className={styles.commentUsername}>{comment.username}&nbsp;&nbsp;</span>
                                        <span className={styles.commentDate}>{comment.date}</span>
                                    </div>
                                    <p className={styles.commentContent}>{comment.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityBoardDetail;
