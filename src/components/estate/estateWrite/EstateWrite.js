import styles from './EstateWrite.module.scss';
import { useRef, useState } from 'react';
import { DatePicker, message, Modal } from 'antd';
import { FiPlus } from 'react-icons/fi';
import Button01 from '../../commons/button/Button01';
import { Link, useNavigate } from 'react-router-dom';
import { MdCancel } from 'react-icons/md';
import DaumPostcode from 'react-daum-postcode';
import { url } from 'lib/axios';
import axios from 'axios';

const EstateWrite = () => {
  const navigate = useNavigate();
  const imgRef = useRef();
  const [textCount, setTextCount] = useState(0);
  const [imgList, setImgList] = useState([]);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [isParking, setIsParking] = useState(false);
  const [isManage, setIsManage] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [estate, setEstate] = useState({
    type: '',
    address: '',
    addressDetail: '',
    jibunAddress: '',
    size1: '',
    size2: '',
    roomCount: 0,
    rentType: 'jeonse',
    jeonsePrice: 0,
    monthlyPrice: 0,
    buyPrice: 0,
    depositPrice: 0,
    managePrice: 0,
    availableDate: '',
    availableState: false,
    totalFloor: 0,
    floor: 0,
    bathCount: 0,
    parking: 0,
    utility: '',
    title: '',
    content: '',
  });

  // 다음 주소 검색
  const handleComplete = (data) => {
    console.log(data);
    setEstate({
      ...estate,
      address: data.address,
      addressDetail: data.buildingName,
      jibunAddress: data.jibunAddress,
    });
    onToggleAddress();
  };

  const onToggleAddress = () => {
    setIsAddressOpen((prev) => !prev);
  };

  // 날짜 선택
  const onChangeDate = (date, dateString) => {
    // console.log(date, dateString);
    setEstate({ ...estate, availableDate: dateString });
  };

  // 이미지
  const handleAddImages = (e) => {
    const addImgLists = e.target.files;
    let imgFileLists = [...imgList];

    for (let add of addImgLists) {
      imgFileLists.push(add); // File 객체로 저장
    }

    if (imgFileLists.length > 8) {
      imgFileLists = imgFileLists.slice(0, 8);
    }

    setImgList(imgFileLists);
  };

  const handleDeleteImg = (img) => {
    setImgList([...imgList.filter((i) => i !== img)]);
  };

  // 입력값
  const handleEdit = (e) => {
    setEstate({ ...estate, [e.target.name]: e.target.value });

    if (e.target.name === 'content') {
      setTextCount(e.target.value.length);
    }

    if (e.target.name === 'type' && e.target.value === 'land') {
      setEstate((prev) => ({
        ...prev,
        rentType: 'buy',
      }));
    }

    // 평 -> 면적 변환
    if (estate.rentType !== 'apt' && e.target.name === 'size1') {
      setEstate((prev) => ({
        ...prev,
        size2: Math.trunc(e.target.value * 3.3058 * 100) / 100,
      }));
    } else if (estate.rentType !== 'apt' && e.target.name === 'size2') {
      setEstate((prev) => ({
        ...prev,
        size1: Math.round(e.target.value * 0.3025),
      }));
    }

    if (e.target.name === 'availableState') {
      setEstate((prev) => ({
        ...prev,
        availableState: e.target.checked,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (imgList.length < 3) {
      messageApi.open({
        type: 'warning',
        content: '사진은 필수 최소 3장이상 등록해야 합니다.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('type', estate.type);
    formData.append('address1', estate.address);
    formData.append('address2', estate.addressDetail);
    formData.append('jibunAddress', estate.jibunAddress);
    formData.append('size1', estate.size1);
    formData.append('size2', estate.size2);
    formData.append('roomCount', estate.roomCount);
    formData.append('rentType', estate.rentType);
    formData.append('jeonsePrice', estate.jeonsePrice);
    formData.append('monthlyPrice', estate.monthlyPrice);
    formData.append('buyPrice', estate.buyPrice);
    formData.append('depositPrice', estate.depositPrice);
    formData.append('managePrice', estate.managePrice);
    formData.append('availableDate', estate.availableDate);
    formData.append('availableState', estate.availableState);
    formData.append('totalFloor', estate.totalFloor);
    formData.append('floor', estate.floor);
    formData.append('bathCount', estate.bathCount);
    formData.append('parking', estate.parking);
    formData.append('utility', estate.utility);
    formData.append('title', estate.title);
    formData.append('content', estate.content);

    for (let img of imgList) {
      formData.append('images', img);
    }

    if (estate.type === 'land') {
      formData.delete('availableDate');
    }

    axios
      .post(`${url}/estateWrite`, formData)
      .then((res) => {
        console.log(res);
        // navigate('/estate', {
        //   state: { estateNum: res.data },
        // });
        Modal.success({
          content: '매물 등록이 완료되었습니다.',
        });
        navigate('/estate');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className={styles.container}>
      <h2>매물 등록하기</h2>
      <ul className={styles.alert}>
        <li>전/월세,매매만 등록할 수 있습니다.</li>
        <li>1개의 매물만 등록 가능합니다.</li>
        <li>
          주소를 다르게 입력할 경우, 허위매물로 신고될 수 있으니 꼭 동일하게
          입력 바랍니다.
        </li>
      </ul>
      <section>
        <div className={styles.title}>
          <h3>매물 정보</h3>
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
            매물 주소<span>*</span>
          </label>
          <div className={styles.address}>
            <div className={styles.addressBtnWrap}>
              <input
                type="text"
                name="address"
                placeholder="주소를 검색해주세요."
                readOnly
                required
                value={estate.address}
                onChange={handleEdit}
              />
              <Button01 size="x-small" type="button" onClick={onToggleAddress}>
                주소검색
              </Button01>
              {isAddressOpen && (
                <Modal
                  open={isAddressOpen}
                  onOk={onToggleAddress}
                  onCancel={onToggleAddress}
                  centered
                  className={styles.customModal}
                >
                  <DaumPostcode onComplete={handleComplete} />
                </Modal>
              )}
            </div>
            <input
              type="text"
              name="addressDetail"
              placeholder="상세 주소를 입력해주세요."
              value={estate.addressDetail}
              onChange={handleEdit}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label>
            면적<span>*</span>
          </label>
          <div className={styles.flexRow}>
            {estate.type === 'apt' ? (
              <div className={styles.flexRow}>
                <div className={styles.subLabelWrap}>
                  <label>전용면적</label>
                  <div className={styles.inputTextWrap}>
                    <input
                      type="text"
                      name="size1"
                      required
                      onChange={handleEdit}
                    />
                    <p>㎡</p>
                  </div>
                </div>
                <div className={styles.subLabelWrap}>
                  <label>공급면적</label>
                  <div className={styles.inputTextWrap}>
                    <input
                      type="text"
                      name="size2"
                      required
                      onChange={handleEdit}
                    />
                    <p>㎡</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.flexRow}>
                <div className={styles.inputTextWrap}>
                  <input
                    type="text"
                    name="size1"
                    required
                    onChange={handleEdit}
                    value={estate.size1 || ''}
                  />
                  <p>평</p>
                </div>
                <p style={{ margin: '0 8px' }}>=</p>
                <div className={styles.inputTextWrap}>
                  <input
                    type="text"
                    name="size2"
                    required
                    onChange={handleEdit}
                    value={estate.size2 || ''}
                  />
                  <p>㎡</p>
                </div>
              </div>
            )}
          </div>
        </div>
        {estate.type !== 'land' && (
          <div className={styles.item}>
            <label>
              방 개수<span>*</span>
            </label>
            <div className={styles.inputTextWrap}>
              <input
                type="text"
                name="roomCount"
                required
                onChange={handleEdit}
              />
              <p>개</p>
            </div>
          </div>
        )}
      </section>
      <section>
        <h3>거래 정보</h3>
        <hr className={styles.line} />
        <div className={styles.item}>
          <label>
            거래 종류<span>*</span>
          </label>
          {estate.type === 'land' ? (
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
                checked={estate.rentType === 'jeonse'}
              />
              <label htmlFor="jeonse">전세</label>
              <input
                type="radio"
                id="monthly"
                name="rentType"
                value="monthly"
                onChange={handleEdit}
                checked={estate.rentType === 'monthly'}
              />
              <label htmlFor="monthly">월세</label>
              <input
                type="radio"
                id="buy"
                name="rentType"
                value="buy"
                onChange={handleEdit}
                checked={estate.rentType === 'buy'}
              />
              <label htmlFor="buy">매매</label>
            </div>
          )}
        </div>
        <div className={styles.item}>
          <label>
            가격 정보<span>*</span>
          </label>
          {estate.rentType === 'jeonse' && (
            <div className={styles.subLabelWrap}>
              <label>전세가</label>
              <div className={styles.inputTextWrap}>
                <input type="text" name="jeonsePrice" onChange={handleEdit} />
                <p>만원</p>
              </div>
            </div>
          )}
          {estate.rentType === 'monthly' && (
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
          {estate.rentType === 'buy' && (
            <div className={styles.subLabelWrap}>
              <label>매매가</label>
              <div className={styles.inputTextWrap}>
                <input type="text" name="buyPrice" onChange={handleEdit} />
                <p>만원</p>
              </div>
            </div>
          )}
        </div>
        {estate.type !== 'land' && (
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
      {estate.type !== 'land' && (
        <section>
          <h3>추가 정보</h3>
          <hr className={styles.line} />
          <div className={styles.item}>
            <label>
              층 수<span>*</span>
            </label>
            <div className={styles.subLabelWrap}>
              <label>전체 층수</label>
              <div className={styles.inputTextWrap}>
                <input
                  type="text"
                  name="totalFloor"
                  required
                  onChange={handleEdit}
                />
                <p>층</p>
              </div>
            </div>
            <div className={styles.subLabelWrap}>
              <label>해당 층수</label>
              <div className={styles.inputTextWrap}>
                <input
                  type="text"
                  name="floor"
                  required
                  onChange={handleEdit}
                />
                <p>층</p>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <label>
              욕실 수<span>*</span>
            </label>
            <div className={styles.inputTextWrap}>
              <input
                type="text"
                name="bathCount"
                required
                onChange={handleEdit}
              />
              <p>개</p>
            </div>
          </div>
          <div className={styles.item}>
            <label>
              주차 가능 여부<span>*</span>
            </label>
            <div className={styles.radioGroup}>
              <input
                type="radio"
                id="false"
                name="isParking"
                value="false"
                required
                onChange={() => setIsParking(false)}
                defaultChecked
              />
              <label htmlFor="false">불가능</label>
              <input
                type="radio"
                id="true"
                name="isParking"
                value="true"
                onChange={() => setIsParking(true)}
              />
              <label htmlFor="true">가능</label>
            </div>
            {isParking && (
              <div className={styles.inputTextWrap}>
                <input
                  type="text"
                  name="parking"
                  required
                  onChange={handleEdit}
                />
                <p>대</p>
              </div>
            )}
          </div>
          <div className={styles.item}>
            <label>
              객실 시설<span>*</span>
            </label>
            <input
              type="text"
              name="utility"
              placeholder="예) 전자레인지, 가스레인지(인버터), 에어컨, 냉장고, 와이파이, 인터넷 등"
              style={{ width: '100%', textAlign: 'left' }}
              required
              onChange={handleEdit}
            />
          </div>
        </section>
      )}
      <section>
        <h3>사진 등록</h3>
        <hr className={styles.line} />
        <ul className={styles.alert}>
          <li>
            사진은 필수 <span>최소 3장</span>(한 장당 최대 10MB),{' '}
            <span>최대 8장</span>까지 등록할 수 있습니다. (가로로 찍은 사진 권장
            - 가로 사이즈 최소 800px)
          </li>
          <li>
            사진이 많거나 용량이 클 경우 업로드 시간이 다소 지연될 수 있습니다.
          </li>
          <li>
            해당 중개물과 관련된 평면도 혹은 실 사진만 첨부 바랍니다. (그 외
            관계없는 이미지는 삭제될 수 있습니다.)
          </li>
        </ul>
        <div className={styles.item}>
          <label>
            일반 사진<span>*</span>
          </label>
          <div className={styles.imgBtnWrap}>
            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={handleAddImages}
              ref={imgRef}
              multiple
            />
            <button
              className={styles.addImgBtn}
              type="button"
              onClick={() => imgRef.current.click()}
            >
              <FiPlus size={18} />
              사진 추가
            </button>
            <div className={styles.imgsWrap}>
              {imgList.map((img, i) => (
                <div key={i} className={styles.imgCancelWrap}>
                  <MdCancel
                    size={25}
                    className={styles.cancelBtn}
                    onClick={() => handleDeleteImg(img)}
                  />
                  <div className={styles.imgWrap}>
                    <img src={URL.createObjectURL(img)} alt="매물등록 이미지" />
                  </div>
                </div>
              ))}
            </div>
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
            placeholder="리스트에 노출되는 문구입니다. 40자 이내로 작성해주세요."
            style={{ width: '100%', textAlign: 'left' }}
            onChange={handleEdit}
          />
        </div>
        <div className={styles.item}>
          <label>
            상세 설명<span>*</span>
          </label>
          <div className={styles.textareaWrap}>
            <textarea
              name="content"
              minLength="5"
              maxLength="1000"
              className={styles.detailTextarea}
              placeholder="매물 상세 페이지에 노출되는 문구입니다. 1000자 이내로 작성해주세요."
              onChange={handleEdit}
            />
            <p>
              <span>{textCount}</span> / 1000
            </p>
          </div>
        </div>
        <ul className={styles.alert} style={{ margin: '0 0 0 150px' }}>
          <li>매물 정보와 관련없는 홍보성 정보는 입력할 수 없습니다.</li>
          <li>매물등록규정에 위반되는 금칙어는 입력할 수 없습니다.</li>
          <li>
            위 주위사항 위반시 임의로 매물 삭제 혹은 서비스 이용이 제한될 수
            있습니다.
          </li>
        </ul>
      </section>
      <div className={styles.btnWrap}>
        {contextHolder}
        <Button01 size="small" type="submit" onClick={handleSubmit}>
          등록하기
        </Button01>
        <Button01 color="sub" size="small">
          <Link to={'/'}>취소하기</Link>
        </Button01>
      </div>
    </form>
  );
};

export default EstateWrite;
