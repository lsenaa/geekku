import styles from './OnestopWrite.module.scss';
import { useState } from 'react';
import { DatePicker, Modal } from 'antd';
import Button01 from '../../commons/button/Button01';
import { Link, useNavigate } from 'react-router-dom';

import { hangjungdong } from 'utils/hangjungdong';
import axios from 'axios';
import { url } from 'lib/axios';

const OneStopWrite = () => {
  const navigate = useNavigate();
  const [textCount, setTextCount] = useState(0);
  const [isManage, setIsManage] = useState(false);
  const { sido, sigugun } = hangjungdong;
  const [onestop, setOnestop] = useState({
    title: '',
    content: '',
    address1: '',
    address2: '',
    allowPhone: false,
    interiorType: false,
    money: '',
    jeonsePrice: 0,
    monthlyPrice: 0,
    buyPrice: 0,
    depositPrice: 0,
    movePersons: '',
    rentType: 'buy',
    size: '',
    type: '',
    workType: false,
  });

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  const onTextareaHandler = (e) => {
    setTextCount(e.target.value.length);
  };

  const handleEdit = (e) => {
    setOnestop({ ...onestop, [e.target.name]: e.target.value });

    if (e.target.name === 'content') {
      setTextCount(e.target.value.length);
    }

    if (e.target.name === 'type' && e.target.value === 'land') {
      setOnestop({ ...onestop, [e.target.name]: e.target.value });
      (prev) => ({
        ...prev,
        rentType: 'buy',
      });
    }
  };

  const handleSido = (e) => {
    const selectedSido = sido.find((si) => si.sido === e.target.value);

    setOnestop((prev) => ({
      ...prev,
      sido: selectedSido.sido,
      sigugun: '',
      address1: selectedSido.codeNm, // 시/도 이름 저장
      address2: '', // 시/도 변경 시 구/군 초기화
    }));
  };

  const handleSigugun = (e) => {
    const selectedSigugun = sigugun.find(
      (gun) => gun.sigugun === e.target.value
    );

    setOnestop((prev) => ({
      ...prev,
      sigugun: selectedSigugun.sigugun,
      address2: selectedSigugun?.codeNm, // 구/군 이름 저장
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', onestop.title);
    formData.append('content', onestop.content);
    formData.append('address1', onestop.address1);
    formData.append('address2', onestop.address2);
    formData.append('allowPhone', onestop.allowPhone);
    formData.append('interiorType', onestop.interiorType);
    formData.append('money', onestop.money);
    formData.append('movePersons', onestop.movePersons);
    formData.append('rentType', onestop.rentType);
    formData.append('size', onestop.size);
    formData.append('type', onestop.type);
    formData.append('workType', onestop.workType);

    axios
      .post(`${url}/onestopWrite`, formData)
      .then((res) => {
        Modal.success({
          content: '집꾸 등록이 완료되었습니다.',
        });
        console.log(res.data);
        navigate(`/oneStop/detail/${res.data}`);
      })
      .catch((err) => {
        console.log(err);
        alert('등록오류');
      });
  };

  return (
    <div className={styles.container}>
      <h2>한번에 꾸하기 신청하기</h2>
      <section>
        <div className={styles.title}>
          <h3>원하는 매물 정보</h3>
          <p>
            <span>*</span>필수 입력 항목
          </p>
        </div>
        <hr className={styles.line} />
        <div className={styles.item}>
          <label>
            매물 유형<span>*</span>
          </label>
          <select
            className={styles.select}
            name="type"
            required="required"
            onChange={handleEdit}
          >
            <option value="" disabled>
              매물 유형 선택
            </option>
            <option value="farmHouse">시골농가주택</option>
            <option value="countryHouse">전원주택</option>
            <option value="apt">아파트/빌라</option>
            <option value="land">농장/토지</option>
          </select>
        </div>
        <div className={styles.item}>
          <label>
            지역<span>*</span>
          </label>
          <select
            className={styles.select}
            name="address1"
            required="required"
            style={{ marginRight: '16px' }}
            value={onestop.sido || ''}
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
            name="address2"
            defaultValue=""
            required="required"
            value={onestop.sigugun || ''}
            onChange={handleSigugun}
          >
            <option value="" disabled>
              상세 지역 선택
            </option>
            {sigugun
              .filter((gun) => gun.sido === onestop.sido)
              .map((gu) => (
                <option value={gu.sigugun} key={gu.sigugun}>
                  {gu.codeNm}
                </option>
              ))}
          </select>
        </div>
        <div className={styles.item}>
          <label>
            거래 종류<span>*</span>
          </label>
          {onestop.type === 'land' ? (
            <div className={styles.radioGroup}>
              <input
                type="radio"
                id="buy"
                name="rentType"
                value="buy"
                checked
                readOnly
              />
              <label htmlFor="buy">매매</label>
            </div>
          ) : (
            <div className={styles.radioGroup}>
              <input
                type="radio"
                id="jeonse"
                name="rentType"
                value="jeonse"
                onChange={handleEdit}
                checked={onestop.rentType === 'jeonse'}
              />
              <label htmlFor="jeonse">전세</label>
              <input
                type="radio"
                id="monthly"
                name="rentType"
                value="monthly"
                onChange={handleEdit}
                checked={onestop.rentType === 'monthly'}
              />
              <label htmlFor="monthly">월세</label>
              <input
                type="radio"
                id="buy"
                name="rentType"
                value="buy"
                onChange={handleEdit}
                checked={onestop.rentType === 'buy'}
              />
              <label htmlFor="buy">매매</label>
            </div>
          )}
        </div>
        <div className={styles.item}>
          <label>
            총 예산<span>*</span>
          </label>
          <div className={styles.subLabelWrap}>
            <div className={styles.inputTextWrap}>
              <input type="number" name="money" onChange={handleEdit} />
              <p>만원</p>
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <label>
            희망 평수<span>*</span>
          </label>
          <select
            className={styles.select}
            name="size"
            defaultValue=""
            required="required"
            onChange={handleEdit}
          >
            <option value="" disabled>
              희망 평수 선택
            </option>
            <option value="10">10평 이상</option>
            <option value="20">20평 이상</option>
            <option value="30">30평 이상</option>
            <option value="40">40평 이상</option>
          </select>
        </div>
        <div className={styles.item}>
          <label>
            시공 종류<span>*</span>
          </label>
          <div className={styles.radioGroup}>
            <input
              type="radio"
              id="0"
              name="workType"
              value="0"
              onChange={handleEdit}
            />
            <label htmlFor="전체">전체 시공</label>
            <input
              type="radio"
              id="1"
              name="workType"
              value="1"
              onChange={handleEdit}
            />
            <label htmlFor="부분">부분시공</label>
          </div>
        </div>
        <div className={styles.items}>
          <label>
            인테리어 시공<span>*</span>
          </label>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              name="interiorType"
              value="1"
              onChange={handleEdit}
            />
            <label>도배</label>
            <input
              type="checkbox"
              name="interiorType"
              value="2"
              onChange={handleEdit}
            />
            <label>바닥</label>
            <input
              type="checkbox"
              name="interiorType"
              value="3"
              onChange={handleEdit}
            />
            <label>몰딩</label>
            <input
              type="checkbox"
              name="interiorType"
              value="4"
              onChange={handleEdit}
            />
            <label>샷시</label>
            <input
              type="checkbox"
              name="interiorType"
              value="5"
              onChange={handleEdit}
            />
            <label>페인트</label>
          </div>
        </div>
        <div className={styles.items}>
          <label></label>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              name="interiorType"
              value="6"
              onChange={handleEdit}
            />
            <label>조명</label>
            <input
              type="checkbox"
              name="interiorType"
              value="7"
              onChange={handleEdit}
            />
            <label> 욕실</label>
            <input
              type="checkbox"
              name="interiorType"
              value="8"
              onChange={handleEdit}
            />
            <label>주방</label>
            <input
              type="checkbox"
              name="interiorType"
              value="9"
              onChange={handleEdit}
            />
            <label>문/현관</label>
            <input
              type="checkbox"
              name="interiorType"
              value="10"
              onChange={handleEdit}
            />
            <label>베란다</label>
          </div>
        </div>
        <div className={styles.item}>
          <label>
            이동 인원<span>*</span>
          </label>
          <select
            className={styles.select}
            name="movePersons"
            id="movePersons"
            defaultValue=""
            required="required"
            onChange={handleEdit}
          >
            <option value="" disabled>
              이동 인원
            </option>
            <option value="1">1명</option>
            <option value="2">2명</option>
            <option value="3">3명</option>
            <option value="4">4명</option>
            <option value="5">5명 이상</option>
          </select>
        </div>
        <div className={styles.item}>
          <label>
            연락처 공개<span>*</span>
          </label>
          <div className={styles.radioGroup}>
            <input
              type="radio"
              id="true"
              name="allowPhone"
              value="true"
              onChange={handleEdit}
            />
            <label htmlFor="true">공개</label>
            <input
              type="radio"
              id="false"
              name="allowPhone"
              value="false"
              onChange={handleEdit}
            />
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
            name="title"
            id="title"
            onChange={handleEdit}
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
              name="content"
              id="content"
              placeholder="상세 페이지에 노출되는 문구입니다. 1000자 이내로 작성해주세요."
              onChange={(onTextareaHandler, handleEdit)}
            />
          </div>
        </div>
      </section>
      <div className={styles.btnWrap}>
        <Button01 type="submit" size="small" onClick={handleSubmit}>
          신청하기
        </Button01>
        <Button01 color="sub" size="small">
          <Link to={'/oneStop'}>취소하기</Link>
        </Button01>
      </div>
    </div>
  );
};

export default OneStopWrite;
