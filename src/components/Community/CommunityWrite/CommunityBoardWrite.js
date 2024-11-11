import React from 'react';
import styles from './CommunityBoardWrite.module.css';
import { useNavigate } from 'react-router';

const CommunityBoardWrite = () => {
    const navigate = useNavigate();

    const handleCommunityBoard = (event) => {
        event.preventDefault();
        navigate('/CommunityBoardDetail');
    };
    
    return (
        <div className={styles.communityWriteInfo}>
            <h1 className={styles.infoTitle}>집들이 작성하기</h1>
            <div className={styles.requiredNote}>
                <span className={styles.leftText}>집들이 정보 작성</span>
                <span className={styles.rightText}>* 필수 입력 항목</span>
            </div>

            <form className={styles.infoForm}>
                <div className={styles.formGroup}>
                    <label>주거 형태</label>
                    <select className={styles.formControl}>
                        <option>주거 형태 선택</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label>평수</label>
                    <input type="text" className={styles.formControl} placeholder="평수 입력" />
                </div>

                <div className={styles.formGroup}>
                    <label>지역</label>
                    <div className={styles.regionInput}>
                        <select className={styles.formControl}>
                            <option>지역을 선택해주세요</option>
                        </select>
                        <input type="text" className={styles.formControl} placeholder="선택 (아파트/건물명)" />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>가족 형태</label>
                    <select className={styles.formControl}>
                        <option>선택해주세요.</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label>세부 시공 범위</label>
                    <input type="text" className={styles.formControl} placeholder="추가하기" />
                </div>

                <div className={styles.formGroup}>
                    <label>기간</label>
                    <input type="date" className={styles.formControl} />
                    <span className={styles.dateSeparator}>~</span>
                    <input type="date" className={styles.formControl} />
                </div>

                <div className={styles.formGroup}>
                    <label>예산</label>
                    <div className={styles.budgetInput}>
                        <input type="text" className={styles.formControl} placeholder="예산 입력" />
                        <span>만원</span>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>스타일</label>
                    <select className={styles.formControl}>
                        <option>선택해주세요.</option>
                    </select>
                </div>

                <div className={styles.coverUploadContainer}>
                    <p>드래그 앤 드롭이나 추가하기 버튼으로 커버 사진을 업로드해주세요.</p>
                    <button type="button" className={styles.uploadButton}>커버 사진 추가하기</button>
                </div>
                <input type="text" className={styles.titleInput} placeholder="제목을 입력해주세요." maxLength="80" />
                <textarea className={styles.contentInput} placeholder="내용을 입력해주세요."></textarea>
                <button className={styles.submitButton} onClick={handleCommunityBoard}>등록하기</button>
            </form>
        </div>
    );
};

export default CommunityBoardWrite;
