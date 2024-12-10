import styles from './OnestopWrite.module.scss';
import { useState } from 'react';
import { DatePicker, message, Modal } from 'antd';
import Button01 from '../../commons/button/Button01';
import { Link, useNavigate } from 'react-router-dom';
import { hangjungdong } from 'utils/hangjungdong';
import { axiosInToken, url } from 'lib/axios';
import { useAtomValue } from 'jotai';
import { tokenAtom } from 'store/atoms';

const OneStopWrite = () => {
  const navigate = useNavigate();
  const token = useAtomValue(tokenAtom);
  const [textCount, setTextCount] = useState(0);
  const { sido, sigugun } = hangjungdong;
  const [messageApi, contextHolder] = message.useMessage();
  const type = [
    '도배',
    '바닥',
    '몰딩',
    '샷시',
    '페인트',
    '조명',
    '욕실',
    '주방',
    '문/현관',
    '베란다',
  ];
  const [selectType, setSelectType] = useState([]);
  const handleChk = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectType([...selectType, value]);
    } else {
      setSelectType(selectType.filter((type) => type !== value));
    }
  };
  const [workType, setWorkType] = useState(false); // true: 부분 시공, false: 전체 시공

  const handleWorkTypeChange = (e) => {
    const isPartWork = e.target.value === '1'; // '1'이면 부분 시공
    setWorkType(isPartWork);
    setOnestop((prev) => ({
      ...prev,
      workType: isPartWork, // interiorall에도 업데이트
    }));
  };

  const [onestop, setOnestop] = useState({
    title: '',
    content: '',
    address1: '',
    address2: '',
    allowPhone: true,
    money: '',
    movePersons: '',
    rentType: 'jeonse',
    size: 10,
    type: '',
    workType: false,
  });

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
    console.log('제출');
    // 입력값 검증
    if (onestop.type === '') {
      messageApi.open({
        type: 'warning',
        content: '매물 유형을 선택해주세요.',
      });
      return;
    }

    if (onestop.address1 === '') {
      messageApi.open({
        type: 'warning',
        content: '지역을 선택해주세요.',
      });
      return;
    }

    if (onestop.address2 === '') {
      messageApi.open({
        type: 'warning',
        content: '상세 지역을 선택해주세요.',
      });
      return;
    }
    if (onestop.money === '') {
      messageApi.open({
        type: 'warning',
        content: '예산을 입력해주세요.',
      });
      return;
    }

    if (onestop.size === '') {
      messageApi.open({
        type: 'warning',
        content: '희망 평수를 선택해주세요.',
      });
      return;
    }
    {
      workType === false && (
        <>
          {selectType.length === 0 &&
            messageApi.open({
              type: 'warning',
              content: '인테리어 시공종류를 선택해주세요.',
            })}
        </>
      );
    }

    if (onestop.movePersons === '') {
      messageApi.open({
        type: 'warning',
        content: '이동인원을 선택해주세요.',
      });
      return;
    }

    if (onestop.title === '') {
      messageApi.open({
        type: 'warning',
        content: '제목을 입력해주세요.',
      });
      return;
    }

    if (onestop.content === '') {
      messageApi.open({
        type: 'warning',
        content: '상세 내용을 입력해주세요.',
      });
      return;
    }
    const formData = new FormData();
    formData.append('title', onestop.title);
    formData.append('content', onestop.content);
    formData.append('address1', onestop.address1);
    formData.append('address2', onestop.address2);
    formData.append('allowPhone', onestop.allowPhone);
    formData.append('money', onestop.money);
    formData.append('movePersons', onestop.movePersons);
    formData.append('rentType', onestop.rentType);
    formData.append('size', onestop.size);
    formData.append('type', onestop.type);
    formData.append('workType', onestop.workType);
    selectType.forEach((interiorType) =>
      formData.append('interiorType', interiorType)
    );

    axiosInToken(token)
      .post(`/user/onestopWrite`, formData)
      .then((res) => {
        Modal.success({
          content: '한번에 꾸하기 등록이 완료되었습니다.',
        });
        console.log(res.data);
        navigate(`/oneStop/detail/${res.data}`);
      })
      .catch((err) => {
        console.log(err);
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
            value={onestop.type || ''}
            name="type"
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
                defaultChecked
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
        <div>
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
                onChange={handleWorkTypeChange}
                checked={!workType} // 전체 시공일 때 체크
              />
              <label htmlFor="0">전체 시공</label>
              <input
                type="radio"
                id="1"
                name="workType"
                value="1"
                onChange={handleWorkTypeChange}
                checked={workType} // 부분 시공일 때 체크
              />
              <label htmlFor="1">부분 시공</label>
            </div>
          </div>

          {workType && ( // 부분 시공 선택 시 체크박스 표시
            <div className={styles.items}>
              <label>
                인테리어 시공<span>*</span>
              </label>
              <div className={styles.checkboxGroup}>
                {type.map((interiorType) => (
                  <label
                    key={interiorType}
                    className={styles.customLabel}
                    htmlFor={interiorType}
                  >
                    <input
                      type="checkbox"
                      className={styles.customCheck}
                      id={interiorType}
                      value={interiorType}
                      onChange={handleChk}
                    />
                    &nbsp;
                    {interiorType}
                  </label>
                ))}
              </div>
            </div>
          )}
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
              defaultChecked
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
            style={{ width: '860px', textAlign: 'left' }}
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
            <p>
              <span>{textCount}</span> / 1000
            </p>
          </div>
        </div>
      </section>
      <div className={styles.btnWrap}>
        {contextHolder}
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
