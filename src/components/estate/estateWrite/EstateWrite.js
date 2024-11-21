import styles from './EstateWrite.module.scss';
import { useRef, useState } from 'react';
import { DatePicker, Modal } from 'antd';
import { FiPlus } from 'react-icons/fi';
import Button01 from '../../commons/button/Button01';
import { Link } from 'react-router-dom';
import { MdCancel } from 'react-icons/md';
import DaumPostcode from 'react-daum-postcode';

const EstateWrite = () => {
  const [textCount, setTextCount] = useState(0);
  const [estate, setEstate] = useState({
    type: '',
    address: '',
    addressDetail: '',
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
  const [imgList, setImgList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const imgRef = useRef();
  const [isParking, setIsParking] = useState(false);

  const handleComplete = (data) => {
    console.log(data);
    onToggleAddress();
  };

  const onToggleAddress = () => {
    setIsOpen((prev) => !prev);
  };

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  const onTextareaHandler = (e) => {
    setTextCount(e.target.value.length);
  };

  const handleAddImages = (e) => {
    const addImgLists = e.target.files;
    let imgUrlLists = [...imgList];

    for (let add of addImgLists) {
      const currentImageUrl = URL.createObjectURL(add);
      imgUrlLists.push(currentImageUrl);
    }

    if (imgUrlLists.length > 8) {
      imgUrlLists = imgUrlLists.slice(0, 8);
    }

    setImgList(imgUrlLists);
  };

  const handleDeleteImg = (img) => {
    setImgList([...imgList.filter((i) => i !== img)]);
  };

  const handleEdit = (e) => {
    setEstate({ ...estate, [e.target.name]: e.target.value });
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
            <option value="countryHouse">시골농가주택</option>
            <option value="house">전원주택</option>
            <option value="apt">아파트/빌라</option>
            <option value="farm">농장/토지</option>
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
                onChange={handleEdit}
              />
              <Button01 size="x-small" type="button" onClick={onToggleAddress}>
                주소검색
              </Button01>
              {isOpen && (
                <Modal
                  open={isOpen}
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
              onChange={handleEdit}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label>
            면적<span>*</span>
          </label>
          <div className={styles.size}>
            {estate.type === 'apt' ? (
              <>
                <div className={styles.subLabelWrap}>
                  <label>전용면적</label>
                  <input
                    type="text"
                    name="size1"
                    placeholder="㎡"
                    required
                    onChange={handleEdit}
                  />
                </div>
                <div className={styles.subLabelWrap}>
                  <label>공급면적</label>
                  <input
                    type="text"
                    name="size2"
                    placeholder="㎡"
                    required
                    onChange={handleEdit}
                  />
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="size1"
                  placeholder="평"
                  required
                  onChange={handleEdit}
                />
                <p>=</p>
                <input
                  type="text"
                  name="size2"
                  placeholder="㎡"
                  required
                  onChange={handleEdit}
                />
              </>
            )}
          </div>
        </div>
        <div className={styles.item}>
          <label>
            방 개수<span>*</span>
          </label>
          <div className={styles.size}>
            <input
              type="text"
              name="roomCount"
              placeholder="개"
              required
              onChange={handleEdit}
            />
          </div>
        </div>
      </section>
      <section>
        <h3>거래 정보</h3>
        <hr className={styles.line} />
        <div className={styles.item}>
          <label>
            거래 종류<span>*</span>
          </label>
          <div className={styles.radioGroup}>
            <input
              type="radio"
              id="jeonse"
              name="rentType"
              value="jeonse"
              required
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
            가격 정보<span>*</span>
          </label>
          {estate.rentType === 'jeonse' && (
            <div className={styles.subLabelWrap}>
              <label>전세가</label>
              <input
                type="text"
                name="jeonsePrice"
                placeholder="만원"
                onChange={handleEdit}
              />
            </div>
          )}
          {estate.rentType === 'monthly' && (
            <>
              <div className={styles.subLabelWrap}>
                <label>보증금</label>
                <input
                  type="text"
                  name="depositPrice"
                  placeholder="만원"
                  onChange={handleEdit}
                />
              </div>
              <div className={styles.subLabelWrap}>
                <label>월세</label>
                <input
                  type="text"
                  name="monthlyPrice"
                  placeholder="만원"
                  onChange={handleEdit}
                />
              </div>
            </>
          )}
          {estate.rentType === 'buy' && (
            <div className={styles.subLabelWrap}>
              <label>매매가</label>
              <input
                type="text"
                name="buyPrice"
                placeholder="만원"
                onChange={handleEdit}
              />
            </div>
          )}
        </div>
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
            />
            <label htmlFor="false">없음</label>
            <input type="radio" name="isManage" id="true" value="true" />
            <label htmlFor="true">있음</label>
          </div>
          <input
            type="text"
            name="managePrice"
            placeholder="원"
            required
            onChange={handleEdit}
          />
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
            <input type="checkbox" id="availableState" name="availableState" />
            <label htmlFor="availableDate">협의 가능</label>
          </div>
        </div>
      </section>
      <section>
        <h3>추가 정보</h3>
        <hr className={styles.line} />
        <div className={styles.item}>
          <label>
            층 수<span>*</span>
          </label>
          <div className={styles.subLabelWrap}>
            <label>전체 층수</label>
            <input
              type="text"
              placeholder="층"
              name="totalFloor"
              required
              onChange={handleEdit}
            />
          </div>
          <div className={styles.subLabelWrap}>
            <label>해당 층수</label>
            <input
              type="text"
              placeholder="층"
              name="floor"
              required
              onChange={handleEdit}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label>
            욕실 수<span>*</span>
          </label>
          <input
            type="text"
            placeholder="개"
            name="bathCount"
            required
            onChange={handleEdit}
          />
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
            />
            <label htmlFor="false">불가능</label>
            <input type="radio" id="true" name="isParking" value="true" />
            <label htmlFor="true">가능</label>
          </div>
          <input
            type="text"
            placeholder="대"
            name="parking"
            required
            onChange={handleEdit}
          />
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
          />
        </div>
      </section>
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
                    <img src={img} alt="매물등록 이미지" />
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
              onChange={onTextareaHandler}
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
        <Button01 size="small" type="submit">
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
