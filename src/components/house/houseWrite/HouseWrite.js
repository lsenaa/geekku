import styles from './HouseWrite.module.scss';
import { useState } from 'react';
import { DatePicker, Modal } from 'antd';
import Button01 from '../../commons/button/Button01';
import { Link, useNavigate } from 'react-router-dom';
import { hangjungdong } from 'utils/hangjungdong';
import axios from 'axios';
import { url } from 'lib/axios';

const HouseWrite = () => {
  const navigate = useNavigate();
  const [textCount, setTextCount] = useState(0);
  const { sido, sigugun } = hangjungdong;
  const [house, setHouse] = useState({
    type: '',
    address: '',
    addressDetail: '',
    size: '',
    rentType: 'jeonse',
    jeonsePrice: 0,
    monthlyPrice: 0,
    buyPrice: 0,
    depositPrice: 0,
    requestDate: '2000-01-01',
    requestState: false,
    allowPhone: false,
    title: '',
    content: '',
    sido: '',
    sigugun: '',
  });

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
    setHouse({ ...house, requestDate: dateString });
  };

  // 입력값
  const handleEdit = (e) => {
    setHouse({ ...house, [e.target.name]: e.target.value });

    if (e.target.name === 'content') {
      setTextCount(e.target.value.length);
    }

    if (e.target.name === 'type' && e.target.value === 'land') {
      setHouse((prev) => ({
        ...prev,
        rentType: 'buy',
      }));
    }

    if (e.target.name === 'requestState') {
      setHouse((prev) => ({
        ...prev,
        requestState: e.target.checked,
      }));
    }
  };

  const handleSido = (e) => {
    const selectedSido = sido.find((si) => si.sido === e.target.value);

    setHouse((prev) => ({
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

    setHouse((prev) => ({
      ...prev,
      sigugun: selectedSigugun.sigugun,
      addressDetail: selectedSigugun?.codeNm, // 구/군 이름 저장
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('type', house.type);
    formData.append('address1', house.address);
    formData.append('address2', house.addressDetail);
    formData.append('size', house.size);
    formData.append('rentType', house.rentType);
    formData.append('jeonsePrice', house.jeonsePrice);
    formData.append('monthlyPrice', house.monthlyPrice);
    formData.append('buyPrice', house.buyPrice);
    formData.append('depositPrice', house.depositPrice);
    formData.append('requestDate', house.requestDate);
    formData.append('requestState', house.requestState);
    formData.append('allowPhone', house.allowPhone);
    formData.append('title', house.title);
    formData.append('content', house.content);

    axios
      .post(`${url}/houseWrite`, formData)
      .then((res) => {
        Modal.success({
          content: '집꾸 등록이 완료되었습니다.',
        });
        navigate(`/house/detail/${res.data}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <h2>집꾸 신청하기</h2>
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
            defaultValue=""
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
            name="address"
            required="required"
            style={{ marginRight: '16px' }}
            value={house.sido || ''}
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
            value={house.sigugun || ''}
            onChange={handleSigugun}
          >
            <option value="" disabled>
              상세 지역 선택
            </option>
            {sigugun
              .filter((gun) => gun.sido === house.sido)
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
          {house.type === 'land' ? (
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
                checked={house.rentType === 'jeonse'}
              />
              <label htmlFor="jeonse">전세</label>
              <input
                type="radio"
                id="monthly"
                name="rentType"
                value="monthly"
                onChange={handleEdit}
                checked={house.rentType === 'monthly'}
              />
              <label htmlFor="monthly">월세</label>
              <input
                type="radio"
                id="buy"
                name="rentType"
                value="buy"
                onChange={handleEdit}
                checked={house.rentType === 'buy'}
              />
              <label htmlFor="buy">매매</label>
            </div>
          )}
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
            <option value="5">기타</option>
          </select>
        </div>
        <div className={styles.item}>
          <label>
            예산<span>*</span>
          </label>
          {house.rentType === 'jeonse' && (
            <div className={styles.subLabelWrap}>
              <label>전세가</label>
              <div className={styles.inputTextWrap}>
                <input type="text" name="jeonsePrice" onChange={handleEdit} />
                <p>만원</p>
              </div>
            </div>
          )}
          {house.rentType === 'monthly' && (
            <>
              <div className={styles.subLabelWrap}>
                <label>보증금</label>
                <div className={styles.inputTextWrap}>
                  <input
                    type="text"
                    name="depositPrice"
                    onChange={handleEdit}
                  />
                  <p>만원</p>
                </div>
              </div>
              <div className={styles.subLabelWrap}>
                <label>월세</label>
                <div className={styles.inputTextWrap}>
                  <input
                    type="text"
                    name="monthlyPrice"
                    onChange={handleEdit}
                  />
                  <p>만원</p>
                </div>
              </div>
            </>
          )}
          {house.rentType === 'buy' && (
            <div className={styles.subLabelWrap}>
              <label>매매가</label>
              <div className={styles.inputTextWrap}>
                <input type="text" name="buyPrice" onChange={handleEdit} />
                <p>만원</p>
              </div>
            </div>
          )}
        </div>
        <div className={styles.item}>
          <label>
            입주 희망 일자<span>*</span>
          </label>
          <DatePicker
            size="large"
            placeholder="날짜를 선택해주세요."
            name="requestDate"
            onChange={onChangeDate}
          />
          <div className={styles.availableDate}>
            <input
              type="checkbox"
              name="requestState"
              id="requestState"
              onChange={handleEdit}
            />
            <label htmlFor="requestState">미정</label>
          </div>
        </div>
        <div className={styles.item}>
          <label>
            연락처 공개<span>*</span>
          </label>
          <div className={styles.radioGroup}>
            <input
              type="radio"
              id="false"
              name="allowPhone"
              value="false"
              defaultChecked
              onChange={handleEdit}
            />
            <label htmlFor="false">비공개</label>
            <input
              type="radio"
              id="true"
              name="allowPhone"
              value="true"
              onChange={handleEdit}
            />
            <label htmlFor="true">공개</label>
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
            placeholder="리스트에 노출되는 문구입니다. 40자 이내로 작성해주세요."
            style={{ width: '100%', textAlign: 'left' }}
            onChange={handleEdit}
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
              placeholder="상세 페이지에 노출되는 문구입니다. 1000자 이내로 작성해주세요."
              onChange={handleEdit}
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
        <Button01 type="button" color="sub" size="small">
          <Link to={'/house'}>취소하기</Link>
        </Button01>
      </div>
    </div>
  );
};

export default HouseWrite;
