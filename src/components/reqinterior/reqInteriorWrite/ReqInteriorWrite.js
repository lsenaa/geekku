import styles from './ReqInteriorWrite.module.scss';
import { useState } from 'react';
import { DatePicker, Modal } from 'antd';
import Button01 from '../../commons/button/Button01';
import axios from 'axios';
import { url } from 'lib/axios';
import { Link, useNavigate } from 'react-router-dom';
import { hangjungdong } from 'utils/hangjungdong';

const ReqInteriorWrite = () => {
  const navigate = useNavigate();
  const [textCount, setTextCount] = useState(0);
  const { sido, sigugun } = hangjungdong;
  const [interiorall, setInteriorall] = useState({
    name: '',
    title: '',
    add_content: '',
    address1: '',
    address2: '',
    phone: '',
    interior_type: '',
    money: '',
    move_persons: '',
    rent_type: '',
    size: '',
    type: '',
    work_type: '',
  });

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };
  const handleSido = (e) => {
    const selectedSido = sido.find((si) => si.sido === e.target.value);

    setInteriorall((prev) => ({
      ...prev,
      sido: selectedSido.sido,
      sigugun: '',
      address: selectedSido.codeNm, // 시/도 이름 저장
      addressDetail: '', // 시/도 변경 시 구/군 초기화
    }));
  };
  const handleSigugun = (e) => {
    const selectedSigugun = sigugun.find(
      (gun) => gun.sigugun === e.target.value
    );
    const { sido, sigugun } = hangjungdong;
    const onTextareaHandler = (e) => {
      setTextCount(e.target.value.length);
    };
    const navigate = useNavigate();
    const [isManage, setIsManage] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('type', interiorall.type);
      formData.append('address1', interiorall.address);
      formData.append('address2', interiorall.addressDetail);
      formData.append('size', interiorall.size);
      formData.append('rentType', interiorall.rentType);
      formData.append('jeonsePrice', interiorall.jeonsePrice);
      formData.append('monthlyPrice', interiorall.monthlyPrice);
      formData.append('buyPrice', interiorall.buyPrice);
      formData.append('depositPrice', interiorall.depositPrice);
      formData.append('requestDate', interiorall.requestDate);
      formData.append('requestState', interiorall.requestState);
      formData.append('allowPhone', interiorall.allowPhone);
      formData.append('title', interiorall.title);
      formData.append('content', interiorall.content);

      axios
        .post(`${url}/reqInteriorWrite`, formData)
        .then((res) => {
          Modal.success({
            content: '방꾸 등록이 완료되었습니다.',
          });
          navigate(`/interiorall/detail/${res.data}`);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <div className={styles.container}>
        <h2>방꾸미기 신청하기</h2>
        <section>
          <div className={styles.title}>
            <h3>원하는 매물 정보</h3>
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
            <label> 연락처</label>
            <div>
              <input type="text" value="010-1234-5678" />
            </div>
          </div>
          <div className={styles.item}>
            <label>
              지역<span>*</span>
            </label>
            <select
              className={styles.select}
              name="address"
              required="required"
              style={{ marginRight: '16px' }}
              value={interiorall.sido || ''}
              onChange={handleSido}
            >
              <option value="" disabled>
                지역 선택
              </option>
              {sido.map((si) => (
                <option value={si.sido} key={si.sido}>
                  {si.codeNm}
                </option>
              ))}
            </select>
            <select
              className={styles.select}
              name="addressDetail"
              required="required"
              value={interiorall.sigugun || ''}
              onChange={handleSigugun}
            >
              <option value="" disabled>
                상세 지역 선택
              </option>
              {sigugun
                .filter((gun) => gun.sido === interiorall.sido)
                .map((gu) => (
                  <option value={gu.sigugun} key={gu.sigugun}>
                    {gu.codeNm}
                  </option>
                ))}
            </select>
          </div>
          <div className={styles.item}>
            <label>
              건물 유형<span>*</span>
            </label>
            <div className={styles.radioGroup}>
              <input type="radio" id="jeonse" name="rentType" value="jeonse" />
              <label htmlFor="jeonse">전세</label>
              <input
                type="radio"
                id="monthly"
                name="rentType"
                value="monthly"
              />
              <label htmlFor="monthly">월세</label>
              <input type="radio" id="buy" name="rentType" value="buy" />
              <label htmlFor="buy">매매</label>
            </div>
          </div>
          <div className={styles.item}>
            <label>
              시공 평수<span>*</span>
            </label>
            <select
              className={styles.select}
              name="size"
              defaultValue=""
              required="required"
            >
              <option value="" disabled>
                시공 평수 선택
              </option>
              <option value="1">10평 이상</option>
              <option value="2">20평 이상</option>
              <option value="3">30평 이상</option>
              <option value="4">40평 이상</option>
            </select>
          </div>
          <div className={styles.item}>
            <label> 예산 </label>
            <div>
              <input type="text" placeholder="만원" />
            </div>
          </div>
          <div className={styles.item}>
            <label>
              시공 종류<span>*</span>
            </label>
            <div className={styles.radioGroup}>
              <input type="radio" id="all" name="InteriorType" value="all" />
              <label htmlFor="전체">전체 시공</label>
              <input type="radio" id="part" name="InteriorType" value="part" />
              <label htmlFor="부분">부분시공</label>
            </div>
          </div>

          <div className={styles.items}>
            <label>
              인테리어 시공<span>*</span>
            </label>
            <div className={styles.checkboxGroup}>
              <input type="checkbox" name="interiorJenre" value="1" />
              <label>도배</label>
              <input type="checkbox" name="interiorJenre" value="2" />
              <label>바닥</label>
              <input type="checkbox" name="interiorJenre" value="3" />
              <label>몰딩</label>
              <input type="checkbox" name="interiorJenre" value="1" />
              <label>샷시</label>
              <input type="checkbox" name="interiorJenre" value="2" />
              <label>페인트</label>
            </div>
          </div>

          <div className={styles.items}>
            <label></label>
            <div className={styles.checkboxGroup}>
              <input type="checkbox" name="interiorJenre" value="1" />
              <label>조명</label>
              <input type="checkbox" name="interiorJenre" value="2" />
              <label>욕실</label>
              <input type="checkbox" name="interiorJenre" value="3" />
              <label>주방</label>
              <input type="checkbox" name="interiorJenre" value="1" />
              <label>문/현관</label>
              <input type="checkbox" name="interiorJenre" value="2" />
              <label>베란다</label>
            </div>
          </div>

          <div className={styles.item}>
            <label>
              연락처 공개<span>*</span>
            </label>
            <div className={styles.radioGroup}>
              <input type="radio" id="true" name="allowPhone" value="true" />
              <label htmlFor="true">공개</label>
              <input type="radio" id="false" name="allowPhone" value="false" />
              <label htmlFor="false">비공개</label>
            </div>
          </div>
        </section>
        <section>
          <h3>상세 설명</h3>
          <hr className={styles.line} />
          <div className={styles.item}>
            <label>
              제목<span>*</span>
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
              상세 내용<span>*</span>
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
          <Button01 type="submit" size="small" onClick={handleSubmit}>
            신청하기
          </Button01>
          <Button01 color="sub" size="small">
            <Link to={'/requestInterior'}>취소하기</Link>
          </Button01>
        </div>
      </div>
    );
  };
};

export default ReqInteriorWrite;
