import styles from './SampleRegister.module.scss';
import { useRef } from 'react';

const SampleRegister = () => {
  const area = ['경기', '인천', '충청', '강원', '전라', '경상', '제주'];

  const imageInput = useRef();

  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  return (
    <div className={styles.regDesign}>
      <div className={styles.topText}>시공사례 등록하기</div>
      <div className={styles.midText}>
        <span>카테고리 선택</span>
        <span>필수입력항목</span>
      </div>
      <div className={styles.line}></div>
      <form className={styles.formEdit}>
        <ul>
          <li>
            <span>주거형태</span>
            <select className={styles.customSelect}>
              <option>농가주택</option>
              <option>전원주택</option>
              <option>아파트/빌라</option>
            </select>
          </li>
          <li>
            <span>스타일</span>
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
            <span>평수</span>
            <input name="size" className={styles.customSelect} />
          </li>
          <li>
            <span>지역</span>
            {area.map((area) => (
              <label key={area} className={styles.customLabel} htmlFor={area}>
                <input
                  type="checkbox"
                  className={styles.customCheck}
                  id={area}
                />
                {area}
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
            />
            <button
              onClick={onClickImageUpload}
              style={{ margin: '20px auto', width: '330px', height: '60px' }}
            >
              추가하기
            </button>
          </div>
        </div>
        <div className={styles.edt}>에디터 내용~~~~</div>
      </form>
      <button type="submit">등록하기</button>
    </div>
  );
};

export default SampleRegister;
