import React from 'react';
import './MypageInteriorModify.module.css';
import { useNavigate } from 'react-router';

const MypageInteriorModify = () => {
    const navigate = useNavigate(); // 함수 호출로 수정

    const handleCommunityBoard = (event) => {
        event.preventDefault(); // 폼 제출 방지
        navigate('/AllstopDetail');
    };

    return (
        <div className="community-write-info">
            <h1 className="info-title">업체 수정하기</h1>
            <div className="required-note">
                <span className="left-text">업체 정보</span>
                <span className="right-text">* 필수 입력 항목</span>
            </div>

            <form className="info-form">
                <div className="form-group">
                    <label>업체명</label>
                    <input type="text" className="form-control" value="코스타 인테리어" readOnly />
                </div>

                <div className="form-group">
                    <label>부분시공 가능 여부</label>
                    <div className="region-input">
                        <input type="radio" name="type" value="1" />가능
                        <input type="radio" name="type" value="2" />불가능
                    </div>
                </div>


                <div className="form-group">
                    <label>경력</label>
                    <div className="region-input">

                        <input type="text" className="form-control" placeholder="년 " />
                    </div>
                </div>

                <div className="form-group">
                    <label>최근 계약 일자</label>
                    <input type="date" className="form-control" />
                </div>

                <div className="form-group">
                    <label>a/s 보수 기간</label>
                    <input type="text" className="form-control" placeholder="개월" />
                </div>

                <div className="form-group">
                    <label>인테리어 시공</label>
                    <div className="region-input">
                        <input type="checkbox" name="type" value="1" />경기
                        <input type="checkbox" name="type" value="2" />인천
                        <input type="checkbox" name="type" value="3" />충청
                        <input type="checkbox" name="type" value="1" />강원
                        <input type="checkbox" name="type" value="2" />전라
                        <input type="checkbox" name="type" value="1" />경상
                        <input type="checkbox" name="type" value="2" />제주
                    </div>
                </div>

                <div className="cover-upload-container">
                    <p>드래그 앤 드롭이나 추가하기 버튼으로 커버 사진을 업로드해주세요.</p>
                    <button type="button" className="upload-button">커버 사진 추가하기</button>
                </div>


                <div className="community-write-info">

                    <div className="required-note">
                        <span className="left-text">소개글 작성</span>
                    </div>
                    <div className="form-group">
                        <label>한 줄 소개</label><input type="text" className="title-input" placeholder="모던...is done" maxLength="80" />
                       </div>
                        <div className="form-group">
                        <label>소개글(500자 제한)</label>  <textarea className="content-input" placeholder="500자이내소개글을표현해봐요아파트시공합니다아파트아파트"></textarea>
                    </div>
                </div>
                <div className="region-input">
                    <button className="submit-button" onClick={handleCommunityBoard}>수정하기</button>
                    <button className="cancle-button" onClick={handleCommunityBoard}>취소하기</button>
                </div>
            </form>
        </div>
    );
};

export default MypageInteriorModify;
