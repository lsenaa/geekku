import styles from './OnestopWrite.module.scss';
import { useState } from 'react';
import { DatePicker } from 'antd';
import Button01 from '../../commons/button/Button01';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from 'lib/axios';

const OnestopWrite = () => {
  const navigate = useNavigate();
  const [textCount, setTextCount] = useState(0);
  const [isManage, setIsManage] = useState(false);
  const [onestop, setOnestop] = useState({
    title: '',
    content: '',
    address1: '',
    address2: '',
    allow_phone: '',
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
    const submit = (e) => {
      const formData = new FormData();
      formData.append('title', onestop.title);
      formData.append('content', onestop.content);
      formData.append('address1', onestop.address1);
      formData.append('address2', onestop.address2);
      formData.append('allow_phone', onestop.size1);
      formData.append('interior_type', onestop.size2);
      formData.append('money', onestop.money);
      formData.append('move_persons', onestop.address1);
      formData.append('rent_type', onestop.address1);
      formData.append('size', onestop.size);
      formData.append('type', onestop.type);
      formData.append('work_type', onestop.work_type);

      axios
        .post(`${url}/onestopWrite`, formData)
        .then((res) => {
          console.log(res.data);
          navigate(`/onestopDetail/${res.data}`);
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data);
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
              defaultValue=""
              required="required"
            >
              <option value="" disabled>
                매물 유형 선택
              </option>
              <option value="countryHouse">시골농가주택</option>
              <option value="house">전원주택</option>
              <option value="apt">아파트/빌라</option>
              <option value="farm">농장/토지</option>
            </select>
          </div>
          <div className={styles.item}>
            <label>
              지역<span>*</span>
            </label>
            <select
              className={styles.select}
              name="address1"
              defaultValue=""
              required="required"
              style={{ marginRight: '16px' }}
            >
              <option value="" disabled>
                지역 선택
              </option>
              <option value="1">경기도</option>
              <option value="2">충청북도</option>
              <option value="3">충청남도</option>
            </select>
            <select
              className={styles.select}
              name="address2"
              defaultValue=""
              required="required"
            >
              <option value="" disabled>
                상세 지역 선택
              </option>
              <option value="1">지역지역</option>
              <option value="2">지역지역</option>
              <option value="3">지역지역</option>
            </select>
          </div>
          <section>
            <h3>거래 정보</h3>
            <hr className={styles.line} />
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
                가격 정보<span>*</span>
              </label>
              {onestop.rentType === 'jeonse' && (
                <div className={styles.subLabelWrap}>
                  <label>전세가</label>
                  <div className={styles.inputTextWrap}>
                    <input
                      type="text"
                      name="jeonsePrice"
                      onChange={handleEdit}
                    />
                    <p>만원</p>
                  </div>
                </div>
              )}
              {onestop.rentType === 'monthly' && (
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
              {onestop.rentType === 'buy' && (
                <div className={styles.subLabelWrap}>
                  <label>매매가</label>
                  <div className={styles.inputTextWrap}>
                    <input type="text" name="buyPrice" onChange={handleEdit} />
                    <p>만원</p>
                  </div>
                </div>
              )}
            </div>
            {onestop.type !== 'land' && (
              <>
                <div className={styles.item}>
                  <label>
                    관리비<span>*</span>
                  </label>
                  <div className={styles.radioGroup}>
                    <input
                      type="radio"
                      name="isManage"
                      id="false"
                      value="false"
                      required
                      defaultChecked
                      onChange={() => setIsManage(false)}
                    />
                    <label htmlFor="false">없음</label>
                    <input
                      type="radio"
                      name="isManage"
                      id="true"
                      value="true"
                      onChange={() => setIsManage(true)}
                    />
                    <label htmlFor="true">있음</label>
                  </div>
                  {isManage && (
                    <div className={styles.inputTextWrap}>
                      <input
                        type="text"
                        name="managePrice"
                        required
                        onChange={handleEdit}
                      />
                      <p>만원</p>
                    </div>
                  )}
                </div>
                <div className={styles.item}>
                  <label>
                    입주 가능 일자<span>*</span>
                  </label>
                  <DatePicker
                    size="large"
                    placeholder="날짜를 선택해주세요."
                    onChange={onChangeDate}
                    required
                  />
                  <div className={styles.availableDate}>
                    <input
                      type="checkbox"
                      id="availableState"
                      name="availableState"
                      // checked={false}
                      onChange={handleEdit}
                    />
                    <label htmlFor="availableState">협의 가능</label>
                  </div>
                </div>
              </>
            )}
          </section>
          <div className={styles.item}>
            <label>
              희망 평수<span>*</span>
            </label>
            <select
              className={styles.select}
              name="size"
              defaultValue=""
              required="required"
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
              예산<span>*</span>
            </label>
            <div className={styles.subLabelWrap}>
              <label>전세가</label>
              <input type="text" placeholder="만원" />
            </div>
            <div className={styles.subLabelWrap}>
              <label>보증금</label>
              <input type="text" placeholder="만원" />
            </div>
            <div className={styles.subLabelWrap}>
              <label>월세</label>
              <input type="text" placeholder="만원" />
            </div>
            <div className={styles.subLabelWrap}>
              <label>매매가</label>
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
              <label> 욕실</label>
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
              이동 인원<span>*</span>
            </label>
            <select
              className={styles.select}
              name="movingnum"
              defaultValue=""
              required="required"
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
          <Button01 size="small">신청하기</Button01>
          <Button01 color="sub" size="small">
            <Link to={'/oneStop'}>취소하기</Link>
          </Button01>
        </div>
      </div>
    );
  };
};
export default OnestopWrite;
