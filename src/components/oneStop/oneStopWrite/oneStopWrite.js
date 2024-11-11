import React from 'react';
import './oneStopWrite.module.css';
import { useNavigate } from 'react-router';

const OneStopWrite = () => {
    const navigate = useNavigate(); // 함수 호출로 수정

    const handleCommunityBoard = (event) => {
        event.preventDefault(); // 폼 제출 방지
        navigate('/oneStopDetail');
    };

    return (
        <div className="community-write-info">
            <h1 className="info-title">한번에꾸미기 작성하기</h1>
            <div className="required-note">
                <span className="left-text">원하는 매물 정보</span>
                <span className="right-text">* 필수 입력 항목</span>
            </div>

            <form className="info-form">
                <div className="form-group">
                    <label>매물 유형</label>
                    <select className="form-control">
                        <option disabled="disabled">매물 유형 선택하기</option>
                        <option value="시골농가주택">시골 농가 주택</option>
                        <option value="전원주택">전원주택</option>
                        <option value="아파트/빌라">아파트/빌라</option>
                        <option value="농장/토지">농장/토지</option>
                    </select>
                </div>


                <div className="form-group">
                    <label>지역</label>
                    <div className="region-input">
                        <select className="form-control">
                            <option>지역 선택</option>
                        </select>
                        <select className="form-control">
                            <option>상세 지역 선택</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label>거래 종류</label>
                    <div className="region-input">
                        <input type="radio" name="type" value="1" />전세
                        <input type="radio" name="type" value="2" />월세
                        <input type="radio" name="type" value="3" />매매
                    </div>
                </div>


                <div className="form-group">
                    <label>희망 평수</label>
                    <div className="region-input">
                        <select className="form-control">
                            <option value="10">10평 이상</option>
                            <option value="20">20평 이상</option>
                            <option value="30">30평 이상</option>
                            <option value="40">40평 이상</option>
                            <option value="50">50평 이상</option>
                        </select>

                    </div>
                </div>

                <div className="form-group">
                    <label>총 예산</label>
                    <div className="region-input">

                        <input type="text" className="form-control" placeholder="만원 " />
                    </div>
                </div>

                <div className="form-group">
                    <label>거래 종류</label>
                    <div className="region-input">
                        <input type="radio" name="Itype" value="1" />전체 시공
                        <input type="radio" name="Itype" value="2" />부분 시공
                    </div>
                </div>

                <div className="form-group">
                    <label>인테리어 시공</label>
                    <div className="region-input">
                        <input type="checkbox" name="type" value="1" />도배
                        <input type="checkbox" name="type" value="2" />바닥
                        <input type="checkbox" name="type" value="3" />몰딩
                        <input type="checkbox" name="type" value="1" />샷시
                        <input type="checkbox" name="type" value="2" />페인트
                    </div>
                </div>
                <br />
                <div className="form-group">
                    <label></label>
                    <div className="region-input">
                        <input type="checkbox" name="type" value="1" />조명
                        <input type="checkbox" name="type" value="2" />욕실
                        <input type="checkbox" name="type" value="3" />주방
                        <input type="checkbox" name="type" value="1" />문/현관
                        <input type="checkbox" name="type" value="2" />베란다
                    </div>
                </div>

                <div className="form-group">
                    <label>이동 인원</label>
                    <div className="region-input">
                        <select className="form-control">
                            <option>1명</option>
                            <option>2명</option>
                            <option>3명</option>
                            <option>4명</option>
                            <option>5명 이상</option>
                        </select>

                    </div>
                </div>

                <div className="form-group">
                    <label> 연락처 공개 </label>
                    <div className="region-input">
                        <input type="radio" name="possible" value="1" />공개
                        <input type="radio" name="possible" value="2" />비공개
                    </div>
                </div>


                <div className="community-write-info">

                    <div className="required-note">
                        <span className="left-text">상세 설명</span>
                    </div>

                    <input type="text" className="title-input" placeholder="40자 이내로 작성해주세요." maxLength="80" />
                    <textarea className="content-input" placeholder="기타 상세 내용을 1000자 이내로 작성해주세요."></textarea>

                </div>
                <div className="region-input">
                    <button className="submit-button" onClick={handleCommunityBoard}>신청하기</button>
                    <button className="cancle-button" onClick={handleCommunityBoard}>취소하기</button>
                </div>
            </form>
        </div>
    );
};

export default OneStopWrite;
