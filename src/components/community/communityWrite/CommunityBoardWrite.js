import React, { useState, useRef } from 'react';
import styles from './CommunityBoardWrite.module.css';
import axios from 'axios';
import { url } from 'constants/path';
import { useNavigate } from 'react-router';
import Button01 from 'components/commons/button/Button01';

const CommunityBoardWrite = () => {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [textCount, setTextCount] = useState(0);
  const [formData, setFormData] = useState({
    type: '',
    size: '',
    address1: '',
    address2: '',
    familyType: '',
    interiorType: '',
    periodStartDate: '',
    periodEndDate: '',
    money: '',
    style: '',
    title: '',
    content: '',
  });

  const fRef = useRef();

  // 입력 필드 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 파일 선택
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileList([...fileList, e.target.files[0]]);
    }
  };

  // 파일 삭제
  const handleFileDelete = (file) => {
    setFileList(fileList.filter((f) => f !== file));
  };

  // 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    fileList.forEach((file) => {
      formDataToSend.append('coverImage', file);
    });

    try {
      const response = await axios.post(
        `${url}/communityCreate`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('등록 성공:', response.data);
      navigate(`/communityDetail/${response.data}`);
    } catch (error) {
      console.error('등록 실패:', error);
      alert('등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.communityWriteInfo}>
      <h1 className={styles.infoTitle}>집들이 작성하기</h1>
      <div className={styles.requiredNote}>
        <span className={styles.leftText}>인테리어 정보</span>
        <span className={styles.rightText}>
          <span>*</span> 필수 입력 항목
        </span>
      </div>

      <form className={styles.infoForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>주거 형태</label>
          <select
            name="type"
            className={styles.formControl}
            onChange={handleChange}
          >
            <option value="">주거 형태 선택</option>
            <option value="아파트">아파트</option>
            <option value="빌라">빌라</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>평수</label>
          <input
            type="number"
            name="size"
            className={styles.formControl}
            placeholder="평수 입력"
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>지역</label>
          <div className={styles.regionInput}>
            <select
              name="address1"
              className={styles.formControl}
              onChange={handleChange}
            >
              <option value="">지역 선택</option>
              <option value="서울특별시">서울특별시</option>
              <option value="경기도">경기도</option>
            </select>
            <input
              type="text"
              name="address2"
              className={styles.formControl}
              placeholder="선택 (아파트/건물명)"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>가족 형태</label>
          <select
            name="familyType"
            className={styles.formControl}
            onChange={handleChange}
          >
            <option value="">선택해주세요.</option>
            <option value="신혼부부">신혼부부</option>
            <option value="4인가족">4인가족</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>기간</label>
          <input
            type="date"
            name="periodStartDate"
            className={styles.formControl}
            onChange={handleChange}
          />
          <span className={styles.dateSeparator}>~</span>
          <input
            type="date"
            name="periodEndDate"
            className={styles.formControl}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>예산</label>
          <input
            type="number"
            name="money"
            className={styles.formControl}
            placeholder="예산 입력 (만원)"
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>스타일</label>
          <select
            name="style"
            className={styles.formControl}
            onChange={handleChange}
          >
            <option value="">선택해주세요.</option>
            <option value="모던">모던</option>
            <option value="클래식">클래식</option>
          </select>
        </div>

        <div className={styles.coverUploadContainer}>
          <p>
            드래그 앤 드롭이나 추가하기 버튼으로 커버 사진을 업로드해주세요.
          </p>
          <label htmlFor="fileUpload" className={styles.uploadButton}>
            커버 사진 추가하기
          </label>
          <input
            id="fileUpload"
            type="file"
            className={styles.fileInput}
            onChange={handleFileChange}
            ref={fRef}
          />
          <div className={styles.filePreview}>
            {fileList.map((file, index) => (
              <div key={index} className={styles.fileItem}>
                <button
                  type="button"
                  className={styles.fileRemoveButton}
                  onClick={() => handleFileDelete(file)}
                >
                  삭제
                </button>
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className={styles.filePreviewImage}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            name="title"
            className={styles.titleInput}
            placeholder="제목을 입력해주세요."
            onChange={handleChange}
          />
        </div>

        <div className={styles.textareaWrap}>
          <textarea
            name="content"
            minLength="5"
            maxLength="1000"
            className={styles.contentInput}
            placeholder="상세 페이지에 노출되는 문구입니다. 1000자 이내로 작성해주세요."
            onChange={(e) => {
              handleChange(e);
              setTextCount(e.target.value.length);
            }}
          />
          <p className={styles.textCount}>
            <span>{textCount}</span> / 1000
          </p>
        </div>
        <div className={styles.btnWrap}>
          <button type="submit" className={styles.submitButton}>
            등록하기
          </button>
          <Button01
            size="small"
            color="sub"
            onClick={() => navigate('/community')}
          >
            취소하기
          </Button01>
        </div>
      </form>
    </div>
  );
};

export default CommunityBoardWrite;
