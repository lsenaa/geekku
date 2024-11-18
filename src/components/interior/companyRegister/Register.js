import styles from './Register.module.scss';

const Register = () => {
  const area = ['경기', '인천', '충청', '강원', '전라', '경상', '제주'];

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
            시공 가능 지역
            {area.map((area) => (
              <label key={area} htmlFor={area}>
                <input type="checkbox" id={area} />
                {area}
              </label>
            ))}
          </li>
        </ul>
        <div>
          추가하기 버튼으로 커버사진을 업로드 해주세요.
          <br />
          <input type="file" accept="image/*" />
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
