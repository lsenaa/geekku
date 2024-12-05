import React, { useState, useEffect, useRef } from 'react';
import styles from './CommunityBoardEdit.module.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import Button01 from 'components/commons/button/Button01';
import { useAtomValue } from 'jotai';
import { axiosInToken, url } from 'lib/axios';
import { tokenAtom, userAtom } from 'store/atoms';

const CommunityBoardEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fileList, setFileList] = useState([]);
  const [textCount, setTextCount] = useState(0);
  const user = useAtomValue(userAtom);
  const token = useAtomValue(tokenAtom);
  const [formData, setFormData] = useState({
    userId: user.userId,
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

  // 기존 데이터 불러오기
  useEffect(() => {
    const fetchData = () => {
      return axios.get(`${url}/communityCall/${id}`);
    };
    fetchData()
      .then((response) => {
        const communityData = response.data.communityDetail;
        setFormData({
          userId: communityData.userId,
          type: communityData.type,
          size: communityData.size,
          address1: communityData.address1,
          address2: communityData.address2,
          familyType: communityData.familyType,
          interiorType: communityData.interiorType,
          periodStartDate: communityData.periodStartDate,
          periodEndDate: communityData.periodEndDate,
          money: communityData.money,
          style: communityData.style,
          title: communityData.title,
          content: communityData.content,
        });
        console.log(formData);
        if (communityData.coverImage) {
          if (typeof communityData.coverImage === 'string') {
            setFileList([communityData.coverImage]); // 문자열 경로인 경우
          } else {
            setFileList([URL.createObjectURL(communityData.coverImage)]); // 파일 객체인 경우
          }
        } else {
          setFileList([]); // 커버 이미지가 없는 경우
        }
      })
      .catch((error) => {
        console.error('기존 데이터를 불러오는 중 오류 발생:', error);
      });
    fetchData();
  }, []);

  // 입력 필드 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 파일 선택
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileList([e.target.files[0]]);
    }
  };

  // 파일 삭제
  const handleFileDelete = () => {
    setFileList([]);
  };

  // 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        formDataToSend.append(key, formData[key]);
      }
    });
    if (fileList.length > 0) {
      formDataToSend.append('file', fileList[0]);
    }

    try {
      await axiosInToken(token).put(
        `${url}/user/communityUpdate/${id}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('수정 성공');
      navigate(`/CommunityBoardDetail/${id}`);
    } catch (error) {
      console.error('수정 실패:', error);
      alert('수정 중 오류가 발생했습니다.');
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
          <label>
            주거 형태<span>*</span>
          </label>
          <select
            name="type"
            className={styles.formControl}
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">주거 형태 선택</option>
            <option value="아파트/빌라">아파트/빌라</option>
            <option value="시골 농가 주택">시골 농가 주택</option>
            <option value="전원 주택">전원 주택</option>
            <option value="농장 토지">농장 토지</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>
            평수<span>*</span>
          </label>
          <input
            type="number"
            name="size"
            className={styles.formControl}
            value={formData.size}
            placeholder="평수 입력"
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>
            지역<span>*</span>
          </label>
          <div className={styles.regionInput}>
            <select
              name="address1"
              className={styles.formControl}
              onChange={handleChange}
              value={formData.address1}
            >
              <option value="">지역 선택</option>
              <option value="서울특별시">서울특별시</option>
              <option value="부산광역시">부산광역시</option>
              <option value="대구광역시">대구광역시</option>
              <option value="인천광역시">인천광역시</option>
              <option value="광주광역시">광주광역시</option>
              <option value="대전광역시">대전광역시</option>
              <option value="울산광역시">울산광역시</option>
              <option value="세종특별자치시">세종특별자치시</option>
              <option value="경기도">경기도</option>
              <option value="충청북도">충청북도</option>
              <option value="충청남도">충청남도</option>
              <option value="전북특별자치도">전북특별자치도</option>
              <option value="전라남도">전라남도</option>
              <option value="경상북도">경상북도</option>
              <option value="경상남도">경상남도</option>
              <option value="강원특별자치도">강원특별자치도</option>
              <option value="제주특별자치도">제주특별자치도</option>
            </select>
            <input
              type="text"
              name="address2"
              className={styles.formControl}
              placeholder="선택 (아파트/건물명)"
              value={formData.address2}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>
            가족 형태<span>*</span>
          </label>
          <select
            name="familyType"
            className={styles.formControl}
            onChange={handleChange}
            value={formData.familyType}
          >
            <option value="">선택해주세요.</option>
            <option value="싱글라이프">싱글라이프</option>
            <option value="신혼부부">신혼부부</option>
            <option value="아기가 있는 집">아기가 있는 집</option>
            <option value="취학 자녀가 있는 집">취학 자녀가 있는 집</option>
            <option value="부모님과 함께 사는 집">부모님과 함께 사는 집</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>
            기간<span>*</span>
          </label>
          <input
            type="date"
            name="periodStartDate"
            className={styles.formControl}
            value={formData.periodStartDate}
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
          <label>
            예산<span>*</span>
          </label>
          <input
            type="number"
            name="money"
            className={styles.formControl}
            placeholder="예산 입력 (만원)"
            onChange={handleChange}
            value={formData.money}
          />
        </div>

        <div className={styles.formGroup}>
          <label>
            스타일<span>*</span>
          </label>
          <select
            name="style"
            className={styles.formControl}
            onChange={handleChange}
            value={formData.style}
          >
            <option value="">선택해주세요.</option>
            <option value="모던">모던</option>
            <option value="미니멀&심플">미니멀&심플</option>
            <option value="내추럴">내추럴</option>
            <option value="북유럽">북유럽</option>
            <option value="빈티지&레트로">빈티지&레트로</option>
            <option value="클래식&앤틱">클래식&앤틱</option>
            <option value="프랜치&프로방스">프랜치&프로방스</option>
            <option value="러블리&로맨틱">러블리&로맨틱</option>
            <option value="인더스트리얼">인더스트리얼</option>
            <option value="한국&아시아">한국&아시아</option>
            <option value="유니크&믹스매치">유니크&믹스매치</option>
          </select>
        </div>

        <div className={styles.coverUploadContainer}>
          {fileList.length === 0 ? (
            // 파일이 없는 경우 버튼 표시
            <>
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
            </>
          ) : (
            // 파일이 있는 경우 이미지와 삭제 버튼 표시
            <div className={styles.filePreview}>
              <button
                type="button"
                className={styles.fileRemoveButton}
                onClick={() => setFileList([])} // 업로드된 파일 초기화
              >
                ×
              </button>
              <img
                src={
                  typeof fileList[0] === 'string'
                    ? `${url}/communityImage/${fileList[0]}` // 문자열 경로일 경우: 서버 경로를 조합
                    : URL.createObjectURL(fileList[0]) // 파일 객체일 경우: createObjectURL 사용
                }
                alt="Preview"
                className={styles.filePreviewImage}
              />
            </div>
          )}
        </div>

        <div className={styles.titleWrap}>
          <label>
            제목<span>*</span>
          </label>
          <input
            type="text"
            name="title"
            className={styles.titleInput}
            placeholder="제목을 입력해주세요.(40자 이내)"
            maxLength="40"
            onChange={handleChange}
            value={formData.title}
          />
        </div>

        <div className={styles.textareaWrap}>
          <label>
            내용<span>*</span>
          </label>
          <textarea
            name="content"
            minLength="5"
            maxLength="1000"
            className={styles.contentInput}
            placeholder="상세 페이지에 노출되는 문구입니다. 1000자 이내로 작성해주세요."
            value={formData.content}
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

export default CommunityBoardEdit;
