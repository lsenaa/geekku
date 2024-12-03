import styles from './InteriorRegister.module.scss';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { url } from 'lib/axios';
import { useNavigate } from 'react-router-dom';
import Button01 from 'components/commons/button/Button01';

const interiorRegister = () => {
  const area = ['경기', '인천', '충청', '강원', '전라', '경상', '제주'];
  const imageInput = useRef();
  const [textCount, setTextCount] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [selectedLoc, setSelectedLoc] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    possiblePart: '',
    period: '',
    recentCount: '',
    repairDate: '',
    possibleLocation: '',
    file: '',
    intro: '',
    content: '',
  });

  const onClickImageUpload = (e) => {
    if (e.target.file) {
      imageInput.current.click();
    }
  };
  const fileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileList([...fileList, e.target.files[0]]);
    }
  };

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0]; // 선택된 파일 가져오기
  //   if (selectedFile) {
  //     setFile(selectedFile); // 파일 상태 설정
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       file: selectedFile, // formData에 파일도 추가
  //     }));
  //   }
  // };
  const getImageUrl = (e) => {
    let file = e.target.files[0];
    let url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleLocChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      if (selectedLoc.length < 3) {
        setSelectedLoc([...selectedLoc, value]);
        console.log(setSelectedLoc);
      } else {
        alert('최대 3개 지역만 선택할 수 있습니다.');
        e.target.checked = false;
      }
    } else {
      setSelectedLoc(
        selectedLoc.filter((possibleLocation) => possibleLocation !== value)
      );
    }
  };

  const loginCompany = async () => {
    const company = '코스타인테리어';
    setFormData((prevFormData) => ({
      ...prevFormData,
      companyName: company,
    }));
  };

  useEffect(() => {
    loginCompany();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (e.target.name === 'content') {
      setTextCount(e.target.value.length);
    }
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('companyName', formData.companyName);
    data.append('possiblePart', formData.possiblePart);
    data.append('period', formData.period);
    data.append('recentCount', formData.recentCount);
    data.append('repairDate', formData.repairDate);
    selectedLoc.forEach((location) => {
      data.append('possibleLocation', location);
    });
    data.append('intro', formData.intro);
    data.append('content', formData.content);
    for (let file of fileList) {
      data.append('file', file);
    }
    await axios
      .post(`${url}/interiorRegister`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.data);
        alert('인테리어 등록이 완료되었습니다.');
        navigate('/interiorList');
      })
      .catch(function () {
        alert('등록을 실패했습니다.');
      });
  };

  return (
    <div className={styles.regDesign}>
      <div className={styles.topText}>업체 등록하기</div>
      <div className={styles.title}>
        <h3>업체 정보</h3>
        <p>
          <span>*</span>필수 입력 항목
        </p>
      </div>
      <div className={styles.line}></div>
      <form className={styles.formEdit} onSubmit={handleOnSubmit}>
        <ul style={{ width: '100%' }}>
          <li>
            <label htmlFor="companyName">
              업체명<span>*</span>
            </label>
            <input
              name="name"
              className={styles.customSelect}
              value={formData.companyName}
              readOnly
            />
          </li>
          <li className={styles.possiblePart}>
            <label htmlFor="possiblePart">
              부분시공 가능여부<span>*</span>
            </label>
            <label className={styles.radioGroup}>
              <input
                type="radio"
                name="possiblePart"
                value="true"
                onChange={handleInputChange}
                required
              />
              가능
            </label>
            <label className={styles.radioGroup}>
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
            <label htmlFor="period">
              경력<span>*</span>
            </label>
            <input
              name="period"
              className={styles.customSelect}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <label htmlFor="recentCount">
              최근 계약<span>*</span>
            </label>
            <input
              name="recentCount"
              className={styles.customSelect}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <label htmlFor="repairDate">
              보수 기간<span>*</span>
            </label>
            <input
              name="repairDate"
              className={styles.customSelect}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <label>
              지역<span>*</span>
            </label>
            <div className={styles.checkboxGroup}>
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
            </div>
          </li>
        </ul>
        <div className={styles.upload}>
          <span>추가하기 버튼으로 커버사진을 업로드 해주세요.</span>
          <input
            type="file"
            id="fileAdd"
            accept="image/*"
            // onChange={handleFileChange}
            onChange={fileChange}
            style={{ display: 'none' }}
            ref={imageInput}
          />
          <div
            className={styles.add}
            onClick={() => {
              imageInput.current.click();
            }}
          >
            추가하기
            {/* <button
                type="button"
                onClick={onClickImageUpload}
                style={{ margin: '20px auto', width: '330px', height: '60px' }}
              >
                추가하기
              </button>
              <img src={imageUrl} /> */}
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>소개글 작성</h3>
          <div className={styles.line}></div>
          <ul>
            <li className={styles.textSection}>
              <label>
                한줄소개<span>*</span>
              </label>
              <input
                name="intro"
                className={styles.intro}
                placeholder="한줄 소개를 작성해주세요."
                onChange={handleInputChange}
              />
            </li>
            <li className={styles.textAreaWrap}>
              <label>
                소개글<span>*</span>
              </label>
              <textarea
                name="content"
                placeholder="500자 이내로 소개글을 작성해주세요."
                onChange={handleInputChange}
                maxLength={500}
              />
              <p>
                <span className={styles.textCount}>{textCount}</span> / 500
              </p>
            </li>
          </ul>
        </div>
        <button type="submit" className={styles.submitBtn}>
          등록하기
        </button>
      </form>
    </div>
  );
};

export default interiorRegister;
