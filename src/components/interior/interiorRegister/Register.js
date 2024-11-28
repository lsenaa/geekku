import styles from './Register.module.scss';
import { useRef, useState } from 'react';
import axios from 'axios';
import { url } from 'lib/axios';

const Register = () => {
  const area = ['경기', '인천', '충청', '강원', '전라', '경상', '제주'];
  const imageInput = useRef();
  const [selectedLoc, setSelectedLoc] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    possiblePart: '',
    period: '',
    recentCount: '',
    repairDate: '',
    intro: '',
    content: '',
  });
  const [imageFile, setImageFile] = useState(null);

  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  const handleLocChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      if (selectedLoc.length < 3) {
        setSelectedLoc([...selectedLoc, value]);
      } else {
        alert('최대 3개 지역만 선택할 수 있습니다.');
        event.target.checked = false;
      }
    } else {
      setSelectedLoc(
        selectedLoc.filter((possibleLocation) => possibleLocation !== value)
      );
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const submit = async (event) => {
    event.preventDefault(); // 기본 폼 제출 방지

    const data = new FormData();
    data.append('name', formData.name);
    data.append('possiblePart', formData.possiblePart);
    data.append('period', formData.period);
    data.append('recentCount', formData.recentCount);
    data.append('repairDate', formData.repairDate);
    data.append('selectedLoc', JSON.stringify(selectedLoc)); // 배열을 JSON 문자열로 변환
    data.append('intro', formData.intro);
    data.append('description', formData.description);
    if (imageFile) {
      data.append('image', imageFile); // 이미지 파일 추가
    }

    try {
      const response = await axios.post(`${url}/interiorRegister`, data, {
        headers: {
          'Content-Type': 'multipart/form-data', // 파일 업로드를 위한 헤더
        },
      });

      if (response.status === 200) {
        // 성공적으로 전송된 경우
        alert('등록이 완료되었습니다.');
      } else {
        // 오류 처리
        alert('등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버와의 통신 중 오류가 발생했습니다.');
    }
  };
  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  return (
    <div className={styles.regDesign}>
      <div className={styles.topText}>업체 등록하기</div>
      <div className={styles.midText}>
        <span>업체정보</span>
        <span>필수입력항목</span>
      </div>
      <div className={styles.line}></div>
      <form className={styles.formEdit} onSubmit={submit}>
        <ul>
          <li>
            <span>업체명</span>{' '}
            <input
              name="name"
              className={styles.customSelect}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span>부분시공 가능여부</span>
            <label>
              <input
                type="radio"
                name="possiblePart"
                value="true"
                onChange={handleInputChange}
              />
              가능
            </label>
            <label>
              <input
                type="radio"
                name="possiblePart"
                value="false"
                onChange={handleInputChange}
              />
              불가능
            </label>
          </li>
          <li>
            <span>경력</span>
            <input
              name="period"
              className={styles.customSelect}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span>최근 계약</span>
            <input
              name="recentCount"
              className={styles.customSelect}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span>보수 기간</span>
            <input
              name="repairDate"
              className={styles.customSelect}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span>지역</span>
            {area.map((possibleLocation) => (
              <label
                key={possibleLocation}
                className={styles.customLabel}
                htmlFor={possibleLocation}
              >
                <input
                  type="checkbox"
                  className={styles.customCheck}
                  id={possibleLocation}
                  value={possibleLocation}
                  onChange={handleLocChange}
                />
                {possibleLocation}
              </label>
            ))}
          </li>
        </ul>
        <div>
          <div className={styles.upload}>
            <span>추가하기 버튼으로 커버사진을 업로드 해주세요.</span>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={imageInput}
              onChange={handleFileChange}
            />
            <button
              onClick={onClickImageUpload}
              style={{ margin: '20px auto', width: '330px', height: '60px' }}
            >
              추가하기
            </button>
          </div>
        </div>
        <div>
          <span>소개글 작성</span>
          <hr />
          <ul>
            <li>
              <span>한줄소개</span>{' '}
              <input
                name="intro"
                className={styles.intro}
                placeholder="한줄 소개를 작성해주세요"
                onChange={handleInputChange}
              />
            </li>
            <li>
              <span>소개글</span>
              <textarea
                name="content"
                placeholder="500자 이내로 소개글을 작성해주세요"
                onChange={handleInputChange}
              ></textarea>
            </li>
          </ul>
        </div>
      </form>
      <button onClick={submit}>등록하기</button>
    </div>
  );
};

export default Register;
