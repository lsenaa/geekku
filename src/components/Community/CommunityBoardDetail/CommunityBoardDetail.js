import React, { useState } from 'react';
import './CommunityBoardDetail.css';
import { useNavigate } from 'react-router';

const CommunityBoardDetail = () => {
    // 더미 데이터 예시
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
        content: `
            거실: 중심 공간에 블랙으로 시선을 모아보자!
            거실은 집 안에서 가장 중요한 공간이기 때문에, 전체적인 분위기를 결정짓는 역할을 합니다. 
            밝은 베이지 톤의 벽과 화이트 컬러 가구로 꾸며진 거실에 블랙 포인트를 주는 것이 이번 프로젝트의 핵심이었죠. 
            가장 먼저, 커다란 블랙 프레임의 액자를 소파 위에 걸어 심플하면서도 시선을 사로잡는 포인트를 만들었습니다. 
            또한, 블랙 메탈 소재의 사이드 테이블과 램프를 배치해 미니멀한 무드를 강화했습니다. 결과적으로, 
            전체적으로 부드러운 톤의 공간이 블랙 포인트로 인해 더욱 균형 잡힌 느낌을 주게 되었습니다.
            주방: 디테일에 집중한 세련된 변화
            주방은 기능성도 중요하지만, 최근에는 미니멀하면서도 스타일리시
            한 디자인이 많이 선호되고 있습니다. 이번 스타일링에서는 화이트 
            상부장과 하부장을 유지하면서도, 손잡이를 모두 블랙으로 교체했
            습니다. 작은 변화였지만, 그 디테일이 주는 세련미는 놀라웠습니다. 
            추가적으로, 블랙 주방용품들을 함께 매치해 전체적인 통일성을 높
            였습니다. 스테인리스보다는 블랙 색상의 전자제품을 배치함으로써
            주방이 하나의 콘셉트로 완성된 느낌을 주었습니다.
            침실: 아늑하면서도 모던한 감성을 더하다
            침실은 편안함을 최우선으로 고려해야 하지만, 스타일을 포기할 수 없는 공간이기도 합니다. 
            이번 프로젝트에서는 침실에 과감한 블랙 헤드보드를 선택하여 모던함을 더했습니다. 
            여기에 블랙 벽걸이 조명과 작은 블랙 데코 소품을 배치해, 차분한 분위기 속에서도 모던한 감성을 잃지 않도록 했습니다. 
            침대 옆에는 블랙 스탠드를 두어 조명을 통한 아늑함을 유지하면서도 공간의 중심을 잡아주었습니다.
            `,
        imageUrl: require('../../../assets/images/communityExam.png') // 로컬 이미지 경로 설정
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
            <div className="post-image-container">
                <img src={post.imageUrl} alt="상세 이미지" className="post-image" />
            </div>

            <div className="post-detail-container">
                {/* 게시글 헤더 */}
                <div className="header">
                    <button className="back-button" onClick={handleBackButton}>←</button>
                    <div className="header-title">{post.title}</div>
                </div>

                {/* 유저 정보 섹션 */}
                <div className="user-section">
                    <div className="user-info">
                        <div className="profile-icon"></div>
                        <span className="username">{post.username}</span>
                    </div>
                    <div className="actions">
                        <button className="edit-button" onClick={handleWriteButton}>수정하기</button>
                        {/* <span className="bookmark">북마크</span> */}
                    </div>
                </div>

                {/* 게시글 상세 정보 카드 */}
                <div className="details-card">
                    <div className="details-icons">
                        <div className="icon-item">🏠 {post.type}</div>
                        <div className="icon-item">📐 {post.size}</div>
                        <div className="icon-item">✏️ {post.style}</div>
                        <div className="icon-item">👫 {post.family}</div>
                    </div>
                    <hr />
                    <div className="detail-content">지역: {post.location} | 스타일: {post.style} | 예산: {post.budget} | 기간: {post.period}</div>
                    <div className="detail-content">시공 범위: {post.scope}</div>
                </div>

                {/* 게시글 내용 */}
                <div className="post-content">
                    <p>{post.content}</p>
                </div>

                {/* 댓글 섹션 */}
                <div className="comments-section">
                    <div className="comment">댓글</div>
                    <div className="comment-input">
                        <textarea
                            value={newComment}
                            onChange={handleCommentChange}
                            placeholder="댓글을 작성해주세요"
                            maxLength={500}
                        />
                        <button onClick={handleCommentSubmit} className="submit-button">작성하기</button>
                    </div>
                    <div className="comment-output">
                        <div className="comments-list">
                            {comments.map(comment => (
                                <div key={comment.id} className="comment-item">
                                    <div className="comment-header" style={{marginBottom:"10px"}}>
                                        <span className="comment-username">{comment.username}&nbsp;&nbsp;</span>
                                        <span className="comment-date">{comment.date}</span>
                                    </div>
                                    <p className="comment-content">{comment.content}</p>
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
