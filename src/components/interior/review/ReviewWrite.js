import styles from './ReviewWrite.module.scss';
import { useRef } from 'react';

const ReviewWrite = () => {
  const area = ['경기', '인천', '충청', '강원', '전라', '경상', '제주'];

  const imageInput = useRef();

  const onClickImageUpload = () => {
    imageInput.current.click();
  };
  return (
    <div className={styles.regDesign}>
      <div className={styles.topText}>인테리어 업체 리뷰 작성하기</div>
      <div className={styles.midText}>
        잠시 소중한 경험을 남겨주시면 다른 지꾸 유저들에게 큰 도움이 됩니다.
      </div>
      <ul className={styles.reviewInfo}>
        <li>인테리어와 관련없는 홍보성 정보는 입력할 수 없습니다.</li>
        <li>허위리뷰 작성 시 삭제될 수 있습니다.</li>
      </ul>
      <form className={styles.formEdit}>
        <ul>
          <li>
            <span>시공업체명</span>
            <input
              type="text"
              name="companyName"
              className={styles.customSelect}
              required
            />
          </li>
          <li>
            <span>주거형태</span>
            <select className={styles.customSelect} required>
              <option>농가주택</option>
              <option>전원주택</option>
              <option>아파트/빌라</option>
            </select>
          </li>
          <li>
            <span>스타일</span>
            <select className={styles.customSelect} required>
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
            <input name="size" className={styles.customSelect} required />
          </li>
          <li>
            <span>지역</span>
            {area.map((area) => (
              <label key={area} className={styles.customLabel} htmlFor={area}>
                <input
                  type="checkbox"
                  className={styles.customCheck}
                  id={area}
                  required
                />
                {area}
              </label>
            ))}
          </li>
        </ul>
        <div>
          <div className={styles.upload}>
            <span>
              추가하기 버튼으로 리뷰 사진을 업로드해주세요. (최대 8장)
            </span>
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
        <div className={styles.reviewTitle}>리뷰(500자 제한)</div>
        <textarea
          className={styles.edt}
          placeholder="500자 이내로 리뷰를 작성해주세요."
        ></textarea>
      </form>
      <button type="submit">등록하기</button>
    </div>
  );
};

export default ReviewWrite;
