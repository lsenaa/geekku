import styles from './SampleRegister.module.scss';
import { useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import color from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import Button01 from 'components/commons/button/Button01';
import { useNavigate } from 'react-router';

const SampleRegister = () => {
  const area = ['경기', '인천', '충청', '강원', '전라', '경상', '제주'];
  const [selectedLoc, setSelectedLoc] = useState([]);
  const navigate = useNavigate();

  const imageInput = useRef();

  const onClickImageUpload = () => {
    imageInput.current.click();
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

  return (
    <div className={styles.regDesign}>
      <div className={styles.topText}>시공사례 등록하기</div>
      <div className={styles.title}>
        <h3>카테고리 선택</h3>
        <p>
          <span>*</span>필수 입력 항목
        </p>
      </div>
      <div className={styles.line}></div>
      <form className={styles.formEdit}>
        <ul>
          <li>
            <label htmlFor="type">
              주거형태<span>*</span>
            </label>
            <select className={styles.customSelect}>
              <option>농가주택</option>
              <option>전원주택</option>
              <option>아파트/빌라</option>
            </select>
          </li>
          <li>
            <label htmlFor="style">
              스타일<span>*</span>
            </label>
            <select className={styles.customSelect}>
              <option>모던</option>
              <option>우드</option>
              <option>내추럴</option>
              <option>클래식&엔틱</option>
              <option>레트로&빈티지</option>
              <option>미니멀</option>
            </select>
          </li>
          <li>
            <label htmlFor="size">
              평수<span>*</span>
            </label>
            <input name="size" className={styles.customSelect} />
          </li>
          <li>
            <label htmlFor="style">
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
            accept="image/*"
            style={{ display: 'none' }}
            ref={imageInput}
          />
          <button onClick={onClickImageUpload} className={styles.addBtn}>
            추가하기
          </button>
        </div>
        {/* <Editor
          initialValue="내용을 입력해주세요."
          previewStyle="vertical"
          height="300px"
          initialEditType="wysiwyg"
          useCommandShortcut={false}
          hideModeSwitch={true}
          plugins={[color]}
        /> */}
        <div>
          <button type="submit" className={styles.submitBtn}>
            등록하기
          </button>
          <Button01
            type="button"
            size="small"
            color="sub"
            onClick={() => navigate('/sampleList')}
          >
            취소하기
          </Button01>
        </div>
      </form>
    </div>
  );
};

export default SampleRegister;
