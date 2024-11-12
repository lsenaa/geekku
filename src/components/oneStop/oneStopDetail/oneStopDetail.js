import React from 'react';
import './oneStopDetail.module.css';
import { useNavigate } from 'react-router-dom';

const oneStopDetail = () => {
  // const navigate = useNavigate(); // 함수 호출로 수정

  const handleCommunityBoard = (event) => {
    event.preventDefault(); // 폼 제출 방지
    // navigate('/oneStopDetail');
  };

  return (
    <div className="community-write-info">
      <h1 className="info-title">한번에꾸미기 신청내역</h1>

      <div className="community-write-info">
        <div className="required-note">
          <span className="left-text">작성자</span>
          <br />

          <label>매물 유형</label>
          <span>시골 농가 주택</span>
        </div>
      </div>

      <div className="required-note">
        <span className="left-text">원하는 매물 정보</span>
        <span className="right-text">* 필수 입력 항목</span>
      </div>

      <div className="form-group">
        <label>매물 유형</label>
        <span>시골 농가 주택</span>
      </div>

      <div className="form-group">
        <label>지역</label>
        <span>충청북도 단영군</span>
      </div>

      <div className="form-group">
        <label>거래 종류</label>
        <span>전세</span>
      </div>

      <div className="form-group">
        <label>희망 평수</label>
        <span>30명 이상</span>
      </div>

      <div className="form-group">
        <label>총 예산</label>
        <span>1,000만원</span>
      </div>

      <div className="form-group">
        <label>거래 종류</label>
        <span>부분 시공</span>
      </div>

      <div className="form-group">
        <label>인테리어 시공</label>
        <span>도배 바닥 몰딩 샷시 조명 베란다</span>
      </div>

      <div className="form-group">
        <label>이동 인원</label>
        <span>1명</span>
      </div>

      <div className="form-group">
        <label> 연락처 </label>
        <span>010-1234-5678</span> <span>//or 비공개</span>
      </div>

      <div className="community-write-info">
        <div className="required-note">
          <span className="left-text">소개글 작성</span>
        </div>
        <div className="form-group">
          <label>제목</label>
          <input
            type="text"
            className="title-input"
            value="지방으로 내려갈 계획 세우는 중입니다 견적 봐주세요."
            maxLength="80"
            readOnly
          />
        </div>
        <div className="form-group">
          <label>상세내용</label>{' '}
          <textarea
            className="content-input"
            readOnly
            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          ></textarea>
        </div>
      </div>

      <button className="submit-button" onClick={handleCommunityBoard}>
        목록으로
      </button>

      <div className="community-write-info">
        <div className="required-note">
          <span className="left-text">중개업자들의 답변</span>
        </div>
      </div>
    </div>
  );
};

export default oneStopDetail;
