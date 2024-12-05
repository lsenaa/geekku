import styles from './InteriorRegister.module.scss';
import { useRef, useState } from 'react';
import { axiosInToken } from 'lib/axios';
import { useNavigate } from 'react-router-dom';
import Button01 from 'components/commons/button/Button01';
import { Modal } from 'antd';
import { useAtomValue } from 'jotai';
import { tokenAtom, userAtom } from 'store/atoms';
import { MdCancel } from 'react-icons/md';

const interiorRegister = () => {
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const token = useAtomValue(tokenAtom);
  const imageInput = useRef();
  const area = ['경기', '인천', '충청', '강원', '전라', '경상', '제주'];
  const [textCount, setTextCount] = useState(0);
  const [selectedLoc, setSelectedLoc] = useState([]);
  const [coverImg, setCoverImg] = useState(null);
  const [interior, setInterior] = useState({
    companyName: user.companyName,
    possiblePart: false,
    period: '',
    recentCount: '',
    repairDate: '',
    possibleLocation: '',
    file: '',
    intro: '',
    content: '',
  });

  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImg(file);
    }
  };

  // 이미지 제거 핸들러
  const handleRemoveImage = () => {
    setCoverImg(null);
  };

  const handleLocChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      if (selectedLoc.length < 3) {
        setSelectedLoc([...selectedLoc, value]);
      } else {
        Modal.info({
          content: '최대 3개 지역만 선택할 수 있습니다',
        });
        e.target.checked = false;
      }
    } else {
      setSelectedLoc(
        selectedLoc.filter((possibleLocation) => possibleLocation !== value)
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // 숫자 소수점 1자리까지만 입력가능하도록 처리
    const sanitizedValue = value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..{1}).*/g, '$1')
      .replace(/(\..*)\./g, '$1');

    if (name === 'period' || name === 'repairDate') {
      setInterior({
        ...interior,
        [name]: sanitizedValue,
      });
    } else if (name === 'recentCount') {
      setInterior({
        ...interior,
        [name]: value.replace(/[^0-9]/g, ''),
      });
    } else {
      setInterior({
        ...interior,
        [name]: value,
      });
    }

    if (e.target.name === 'content') {
      setTextCount(e.target.value.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('companyName', user.companyName);
    data.append('possiblePart', interior.possiblePart);
    data.append('period', interior.period);
    data.append('recentCount', interior.recentCount);
    data.append('repairDate', interior.repairDate);

    selectedLoc.forEach((location) => {
      data.append('possibleLocation', location);
    });

    data.append('coverImg', coverImg);
    data.append('intro', interior.intro);
    data.append('content', interior.content);

    await axiosInToken(token)
      .post(`/company/interiorRegister`, data)
      .then((res) => {
        console.log(res.data);
        Modal.success({
          content: '인테리어 업체등록이 완료되었습니다.',
        });
        navigate('/interiorList');
      })
      .catch((err) => {
        console.log(err);
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
      <form className={styles.formEdit}>
        <ul style={{ width: '100%' }}>
          <li>
            <label htmlFor="companyName">
              업체명<span>*</span>
            </label>
            <input
              name="name"
              className={styles.customSelect}
              value={user.companyName}
              readOnly
              style={{ background: 'rgb(227 224 224)' }}
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
                value="false"
                onChange={handleInputChange}
                defaultChecked
              />
              불가능
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
          </li>
          <li>
            <label htmlFor="period">
              경력<span>*</span>
            </label>
            <div className={styles.inputTextWrap}>
              <input
                type="text"
                name="period"
                className={styles.customSelect}
                onChange={handleInputChange}
                value={interior.period || ''}
              />
              <p>년</p>
            </div>
          </li>
          <li>
            <label htmlFor="recentCount">
              최근 계약<span>*</span>
            </label>
            <div className={styles.inputTextWrap}>
              <input
                type="text"
                name="recentCount"
                className={styles.customSelect}
                onChange={handleInputChange}
                value={interior.recentCount || ''}
              />
              <p>건</p>
            </div>
          </li>
          <li>
            <label htmlFor="repairDate">
              보수 기간<span>*</span>
            </label>
            <div className={styles.inputTextWrap}>
              <input
                type="text"
                name="repairDate"
                className={styles.customSelect}
                onChange={handleInputChange}
                value={interior.repairDate || ''}
              />
              <p>년</p>
            </div>
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
          {coverImg ? (
            <div className={styles.imgCancelBtnWrap}>
              <MdCancel
                size={30}
                className={styles.cancelBtn}
                onClick={handleRemoveImage}
              />
              <img
                src={URL.createObjectURL(coverImg)}
                alt="커버 이미지"
                className={styles.uploadImg}
              />
            </div>
          ) : (
            <>
              <span>추가하기 버튼으로 커버사진을 업로드 해주세요.</span>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={imageInput}
                onChange={handleImageChange}
              />
              <button
                type="button"
                onClick={onClickImageUpload}
                className={styles.addBtn}
              >
                추가하기
              </button>
            </>
          )}
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
                placeholder="한줄 소개를 작성해주세요. (20자 이내)"
                maxLength={20}
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
        <div className={styles.btnWrap}>
          <button
            type="submit"
            className={styles.submitBtn}
            onClick={handleSubmit}
          >
            등록하기
          </button>
          <Button01
            type="button"
            size="small"
            color="sub"
            onClick={() => navigate(-1)}
          >
            취소하기
          </Button01>
        </div>
      </form>
    </div>
  );
};

export default interiorRegister;
