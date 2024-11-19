import styles from './Register.module.scss';
import { useRef } from 'react';

const Register = () => {
  const area = ['경기', '인천', '충청', '강원', '전라', '경상', '제주'];

  const imageInput = useRef();

  const onClickImageUpload = () => {
    imageInput.current.click();
  };
  return (
    <div className={styles.regDesign}>
      <div className={styles.topText}>업체 등록하기</div>
      <div className={styles.midText}>
        <span>업체정보</span>
        <span>필수입력항목</span>
      </div>
      <div className={styles.line}></div>
      <form className={styles.formEdit}>
        <ul>
          <li>
            <span>업체명</span>{' '}
            <input name="name" className={styles.customSelect} />
          </li>
          <li>
            <span>부분시공 가능여부</span>
            <label>
              <input type="radio" name="possiblePart" value="possible" />
              가능
            </label>
            <label>
              <input type="radio" name="possiblePart" value="impossible" />
              불가능
            </label>
          </li>
          <li>
            <span>경력</span>
            <input name="period" className={styles.customSelect} />
          </li>
          <li>
            <span>최근 계약</span>
            <input name="recentCount" className={styles.customSelect} />
          </li>
          <li>
            <span>보수 기간</span>
            <input name="repairDate" className={styles.customSelect} />
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
              />
            </li>
            <li>
              <span>소개글</span>
              <textarea placeholder="500자 이내로 소개글을 작성해주세요"></textarea>
            </li>
          </ul>
        </div>
      </form>
      <button>등록하기</button>
    </div>
  );
};

export default Register;
