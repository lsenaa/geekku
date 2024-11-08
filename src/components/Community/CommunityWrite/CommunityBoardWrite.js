import React from 'react';
import './CommunityBoardWrite.css';
import { useNavigate } from 'react-router';

const CommunityBoardWrite = () => {
    const navigate = useNavigate(); // 함수 호출로 수정

    const handleCommunityBoard = (event) => {
        event.preventDefault(); // 폼 제출 방지
        navigate('/CommunityBoardDetail');
    };
    
    return (
        <div className="community-write-info">
            <h1 className="info-title">집들이 작성하기</h1>
            <div className="required-note">
                <span className="left-text">집들이 정보 작성</span>
                <span className="right-text">* 필수 입력 항목</span>
            </div>

            <form className="info-form">
                <div className="form-group">
                    <label>주거 형태</label>
                    <select className="form-control">
                        <option>주거 형태 선택</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>평수</label>
                    <input type="text" className="form-control" placeholder="평수 입력" />
                </div>

                <div className="form-group">
                    <label>지역</label>
                    <div className="region-input">
                        <select className="form-control">
                            <option>지역을 선택해주세요</option>
                        </select>
                        <input type="text" className="form-control" placeholder="선택 (아파트/건물명)" />
                    </div>
                </div>

                <div className="form-group">
                    <label>가족 형태</label>
                    <select className="form-control">
                        <option>선택해주세요.</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>세부 시공 범위</label>
                    <input type="text" className="form-control" placeholder="추가하기" />
                </div>

                <div className="form-group period-group">
                    <label>기간</label>
                    <input type="date" className="form-control" />
                    <span className="date-separator">~</span>
                    <input type="date" className="form-control" />
                </div>

                <div className="form-group">
                    <label>예산</label>
                    <div className="budget-input">
                        <input type="text" className="form-control" placeholder="예산 입력" />
                        <span>만원</span>
                    </div>
                </div>

                <div className="form-group">
                    <label>스타일</label>
                    <select className="form-control">
                        <option>선택해주세요.</option>
                    </select>
                </div>

                <div className="cover-upload-container">
                    <p>드래그 앤 드롭이나 추가하기 버튼으로 커버 사진을 업로드해주세요.</p>
                    <button type="button" className="upload-button">커버 사진 추가하기</button>
                </div>
                <input type="text" className="title-input" placeholder="제목을 입력해주세요." maxLength="80" />
                <textarea className="content-input" placeholder="내용을 입력해주세요."></textarea>
                <button className="submit-button" onClick={handleCommunityBoard}>등록하기</button>
            </form>
        </div>
    );
};

export default CommunityBoardWrite;
