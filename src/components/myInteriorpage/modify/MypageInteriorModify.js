import styles from './MypageInteriorModify.module.scss';
import { useState } from 'react';
import { DatePicker } from 'antd';
import Button01 from 'components/commons/button/Button01';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

const MypageInteriorModify = () => {
  const navigate = useNavigate(); // 함수 호출로 수정

  const handlemypageInterior = (event) => {
    event.preventDefault(); // 폼 제출 방지
    navigate('/mypageInterior');
  };

  const handlemodifySuccess = (event) => {
    event.preventDefault(); // 폼 제출 방지
    navigate('/mypageInterior');
  };
  const [textCount, setTextCount] = useState(0);

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  const onTextareaHandler = (e) => {
    setTextCount(e.target.value.length);
  };

  return (
    <div className={styles.container}>
      <h2>내 업체정보 수정하기</h2>
      <section>
        <div className={styles.title}>
          <h3>업체 정보</h3>
          <p>
            <span>*</span>필수 입력 항목
          </p>
        </div>
        <hr className={styles.line} />
        <div className={styles.item}>
          <label>신청자 이름</label>
          <div className={styles.subLabelWrap}>
            <input type="text" value="코스타" />
          </div>
        </div>
        <div className={styles.item}>
          <label>
            부분시공 가능 여부<span>*</span>
          </label>
          <div className={styles.radioGroup}>
            <input type="radio" id="all" name="InteriorType" value="all" />
            <label htmlFor="가능">가능</label>
            <input type="radio" id="part" name="InteriorType" value="part" />
            <label htmlFor="불가능">불가능</label>
          </div>
        </div>
        <div className={styles.item}>
          <label>
            경력<span>*</span>
          </label>
          <div>
            <input type="text" placeholder="년" />
          </div>
        </div>
        <div className={styles.item}>
          <label>
            최근 계약<span>*</span>
          </label>
          <input
            type="date"
            id="start"
            name="trip-start"
            value="2024-11-17"
            min="2020-01-01"
            max="2030-12-31"
          />
        </div>
        <div className={styles.item}>
          <label> 예산 </label>
          <div>
            <input type="text" placeholder="개월" />
          </div>
        </div>

        <div className={styles.items}>
          <label>
            시공 가능 지역<span>*</span>
          </label>
          <div className={styles.checkboxGroup}>
            <input type="checkbox" name="interiorJenre" value="1" />
            <label>경기</label>
            <input type="checkbox" name="interiorJenre" value="2" />
            <label>인천</label>
            <input type="checkbox" name="interiorJenre" value="3" />
            <label>충청</label>
            <input type="checkbox" name="interiorJenre" value="1" />
            <label>강원</label>
            <input type="checkbox" name="interiorJenre" value="2" />
            <label>전라</label>
            <input type="checkbox" name="interiorJenre" value="1" />
            <label>경상</label>
            <input type="checkbox" name="interiorJenre" value="2" />
            <label>제주</label>
          </div>
        </div>
        <div className={styles.coverUploadContainer}>
          <p>
            드래그 앤 드롭이나 추가하기 버튼으로 커버 사진을 업로드해주세요.
          </p>
          <button type="button" className={styles.uploadButton}>
            커버 사진 추가하기
          </button>
        </div>
      </section>
      <section>
        <h3>상세 설명</h3>
        <hr className={styles.line} />
        <div className={styles.item}>
          <label>
            한 줄 소개<span>*</span>
          </label>
          <input
            type="text"
            minLength="5"
            maxLength="40"
            placeholder="리스트에 노출되는 문구입니다. 40자 이내로 작성해주세요."
            style={{ width: '100%', textAlign: 'left' }}
          />
        </div>
        <div className={styles.item}>
          <label>
            소개글<span>*</span>
            <br />
            (500자 제한)
          </label>
          <div className={styles.textareaWrap}>
            <textarea
              minLength="5"
              maxLength="1000"
              className={styles.detailTextarea}
              placeholder="상세 페이지에 노출되는 문구입니다. 1000자 이내로 작성해주세요."
              onChange={onTextareaHandler}
            />
            <p>
              <span>{textCount}</span> / 1000
            </p>
          </div>
        </div>
      </section>
      <div className={styles.btnWrap}>
        <Button01 size="small">수정하기</Button01>
        <Button01 color="sub" size="small">
          <Link to={'/mypageInterior'}>취소하기</Link>
        </Button01>
      </div>
    </div>
  );
};

export default MypageInteriorModify;
