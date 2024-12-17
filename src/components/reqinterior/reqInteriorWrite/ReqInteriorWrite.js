import styles from './ReqInteriorWrite.module.scss';
import { useState } from 'react';
import { DatePicker, message, Modal } from 'antd';
import Button01 from '../../commons/button/Button01';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { hangjungdong } from 'utils/hangjungdong';
import { useAtomValue } from 'jotai';
import { tokenAtom, userAtom } from 'store/atoms';
import { axiosInToken, url } from 'lib/axios';

const ReqInteriorWrite = () => {
  const navigate = useNavigate();
  const [textCount, setTextCount] = useState(0);
  const { sido, sigugun } = hangjungdong;
  const user = useAtomValue(userAtom);
  const token = useAtomValue(tokenAtom);
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
  const [interiorall, setInteriorall] = useState({
    name: user.name,
    title: '',
    phone: '',
    addContent: '',
    address1: '',
    address2: '',
    allowPhone: 0,
    money: '',
    movePersons: '',
    rentType: 'jeonse',
    size: 10,
    type: 'farmHouse',
    workType: true,
  });
  const [workType, setWorkType] = useState('0'); // 0: 전체 시공, 1: 부분 시공

  const handleWorkTypeChange = (e) => {
    const isPartWork = e.target.value === '1'; // '1'이면 부분 시공
    setWorkType(isPartWork);
    setInteriorall((prev) => ({
      ...prev,
      workType: isPartWork, // interiorall에도 업데이트
    }));
  };
  const onTextareaHandler = (e) => {
    setTextCount(e.target.value.length);
  };
  const handleEdit = (e) => {
    setInteriorall({ ...interiorall, [e.target.name]: e.target.value });

    if (e.target.name === 'addContent') {
      setTextCount(e.target.value.length);
    }

    if (e.target.name === 'type' && e.target.value === 'land') {
      setInteriorall({ ...interiorall, [e.target.name]: e.target.value });
      (prev) => ({
        ...prev,
        rentType: 'buy',
      });
    }
  };
  const onChangeDate = (date, dateString) => {
    //console.log(date, dateString);
  };
  const handleSido = (e) => {
    const selectedSido = sido.find((si) => si.sido === e.target.value);

    setInteriorall((prev) => ({
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

    setInteriorall((prev) => ({
      ...prev,
      sigugun: selectedSigugun.sigugun,
      address2: selectedSigugun?.codeNm, // 구/군 이름 저장
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 입력값 검증
    if (interiorall.type === '') {
      messageApi.open({
        type: 'warning',
        content: '매물 유형을 선택해주세요.',
      });
      return;
    }

    if (interiorall.address1 === '') {
      messageApi.open({
        type: 'warning',
        content: '지역을 선택해주세요.',
      });
      return;
    }

    if (interiorall.address2 === '') {
      messageApi.open({
        type: 'warning',
        content: '상세 지역을 선택해주세요.',
      });
      return;
    }
    if (interiorall.money === '') {
      messageApi.open({
        type: 'warning',
        content: '예산을 입력해주세요.',
      });
      return;
    }

    if (interiorall.size === '') {
      messageApi.open({
        type: 'warning',
        content: '시공 평수를 선택해주세요.',
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

    if (interiorall.title === '') {
      messageApi.open({
        type: 'warning',
        content: '제목을 입력해주세요.',
      });
      return;
    }

    if (interiorall.content === '') {
      messageApi.open({
        type: 'warning',
        content: '상세 내용을 입력해주세요.',
      });
      return;
    }
    const formData = new FormData();
    formData.append('type', interiorall.type);
    formData.append('address1', interiorall.address1);
    formData.append('address2', interiorall.address2);
    formData.append('size', interiorall.size);
    formData.append('rentType', interiorall.rentType);
    formData.append('allowPhone', interiorall.allowPhone);
    formData.append('title', interiorall.title);
    formData.append('addContent', interiorall.addContent);
    formData.append('money', interiorall.money);
    formData.append('phone', interiorall.phone);
    selectType.forEach((interiorType) =>
      formData.append('interiorType', interiorType)
    );
    formData.append('workType', interiorall.workType);
    axiosInToken(token)
      .post(`/user/interiorAllWrite`, formData)
      .then((res) => {
        Modal.success({
          content: '방꾸 등록이 완료되었습니다.',
        });
        navigate(`/interiorall/detail/${res.data}`);
      })
      .catch((err) => {
        alert('등록오류');
        console.error(err);
      });
  };
  return (
    <div className={styles.container}>
      <h2>방꾸 신청하기</h2>
      <section>
        <div className={styles.title}>
          <h3>원하는 시공 정보</h3>
          <p>
            <span>*</span>필수 입력 항목
          </p>
        </div>
        <hr className={styles.line} />
        <div className={styles.item}>
          <label>
            지역<span>*</span>
          </label>
          <select
            className={styles.select}
            name="address1"
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
            name="address2"
            required
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
            <input
              type="radio"
              id="jeonse"
              name="rentType"
              value="jeonse"
              onChange={handleEdit}
              defaultChecked
            />
            <label htmlFor="jeonse">전세</label>
            <input
              type="radio"
              id="monthly"
              name="rentType"
              value="monthly"
              onChange={handleEdit}
            />
            <label htmlFor="monthly">월세</label>
            <input
              type="radio"
              id="buy"
              name="rentType"
              value="buy"
              onChange={handleEdit}
            />
            <label htmlFor="buy">매매</label>
          </div>
        </div>
        <div className={styles.item}>
          <label>
            예산<span>*</span>
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
            시공 평수<span>*</span>
          </label>
          <select
            className={styles.select}
            name="size"
            required
            onChange={handleEdit}
            value={interiorall.size}
          >
            <option value="" disabled>
              시공 평수 선택
            </option>
            <option value="10">10평 이상</option>
            <option value="20">20평 이상</option>
            <option value="30">30평 이상</option>
            <option value="40">40평 이상</option>
            <option value="5">50평 이상</option>
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
            연락처 공개<span>*</span>
          </label>
          <div className={styles.radioGroup}>
            <input
              type="radio"
              id="true"
              name="allowPhone"
              value="true"
              onChange={handleEdit}
              defaultChecked
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
            name="title"
            minLength="5"
            maxLength="40"
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
              name="addContent"
              id="addContent"
              className={styles.detailTextarea}
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
          <Link to={'/requestInterior'}>취소하기</Link>
        </Button01>
      </div>
    </div>
  );
};

export default ReqInteriorWrite;
