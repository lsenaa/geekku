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
      <form>
        <ul>
          <li>
            업체명 <input name="name" />
          </li>
          <li>
            부분시공 가능여부
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
            경력 <input name="period" />
          </li>
          <li>
            최근 계약 <input name="recentCount" />
          </li>
          <li>
            보수 기간 <input name="repairDate" />
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
          소개글 작성
          <hr />
          <ul>
            <li>
              한줄소개 <input name="intro" />
            </li>
            <li>
              소개글
              <input
                placeholder="500자 이내로 소개글을 작성해주세요"
                name="content"
                style={{ width: '800px', height: '300px' }}
              />
            </li>
          </ul>
        </div>
      </form>
      <button>등록하기</button>
    </div>
  );
};

export default Register;
