import styles from './ReviewWrite.module.scss';
import { useRef, useState } from 'react';
import minus from '../../../assets/images/minus.png';
import { axiosInToken } from 'lib/axios';
import { useNavigate } from 'react-router';
import { useAtomValue } from 'jotai';
import { tokenAtom } from 'store/atoms';
import Button01 from 'components/commons/button/Button01';
import { message, Modal } from 'antd';
import { FiPlus } from 'react-icons/fi';
import { MdCancel } from 'react-icons/md';

const ReviewWrite = () => {
  const navigate = useNavigate();
  const area = ['경기', '인천', '충청', '강원', '전라', '경상', '제주'];
  const token = useAtomValue(tokenAtom);
  const [fileList, setFileList] = useState([]);
  const [review, setReview] = useState({
    companyName: '',
    type: '',
    style: '',
    size: '',
    content: '',
    location: '경기',
  });
  const [date, setDate] = useState('');
  const [textCount, setTextCount] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const fRef = useRef();

  const edit = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });

    if (e.target.name === 'content') {
      setTextCount(e.target.value.length);
    }

    // 입력값 숫자만 가능하도록 처리
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');

    if (e.target.name === 'size') {
      setReview((prev) => ({
        ...prev,
        [e.target.name]: onlyNumbers,
      }));
    }
  };

  const fileChange = (e) => {
    const addImgLists = e.target.files;
    let imgFileLists = [...fileList];

    for (let add of addImgLists) {
      imgFileLists.push(add);
    }

    if (imgFileLists.length > 8) {
      Modal.info({
        content: '사진은 최대 8장까지 업로드 할 수 있습니다.',
      });
      return;
    }

    setFileList(imgFileLists);
  };

  const delFile = (file) => {
    setFileList([...fileList.filter((f) => f !== file)]);
  };
  const onClickImageUpload = () => {
    fRef.current.click();
  };

  const submit = async (e) => {
    e.preventDefault();

    // 입력값 검증
    if (review.companyName === '') {
      messageApi.open({
        type: 'warning',
        content: '시공업체명을 입력해주세요.',
      });
      return;
    }

    if (date === '') {
      messageApi.open({
        type: 'warning',
        content: '시공날짜를 선택해주세요.',
      });
      return;
    }

    if (review.type === '') {
      messageApi.open({
        type: 'warning',
        content: '주거형태를 선택해주세요.',
      });
      return;
    }

    if (review.style === '') {
      messageApi.open({
        type: 'warning',
        content: '스타일을 선택해주세요.',
      });
      return;
    }

    if (review.size === '') {
      messageApi.open({
        type: 'warning',
        content: '평수를 입력해주세요.',
      });
      return;
    }

    if (fileList.length < 1) {
      messageApi.open({
        type: 'warning',
        content: '사진은 최소 1장이상 업로드해야합니다.',
      });
      return;
    }

    if (review.content === '') {
      messageApi.open({
        type: 'warning',
        content: '리뷰내용을 입력해주세요.',
      });
      return;
    }

    const data = new FormData();
    data.append('companyName', review.companyName);
    data.append('date', date);
    data.append('type', review.type);
    data.append('style', review.style);
    data.append('size', review.size);
    data.append('location', review.location);
    data.append('content', review.content);

    for (let file of fileList) {
      data.append('file', file);
    }

    await axiosInToken(token)
      .post(`/user/interiorReviewWrite`, data)
      .then((res) => {
        console.log(res.data);
        Modal.success({
          content: '인테리어 업체 리뷰등록이 완료되었습니다.',
        });
        navigate('/mypage/person/interior/review');
      })
      .catch((err) => {
        console.log(err);
        Modal.error({
          content: err.response.data
            ? err.response.data
            : '알 수 없는 오류가 발생했습니다.',
        });
      });
  };

  return (
    <div className={styles.regDesign}>
      <div className={styles.topText}>인테리어 업체 리뷰 작성하기</div>
      <div className={styles.midText}>
        잠시 소중한 경험을 남겨주시면 다른 지꾸 유저들에게 큰 도움이 됩니다.
      </div>
      <ul className={styles.reviewInfo}>
        <li>인테리어와 관련없는 홍보성 정보는 입력할 수 없습니다.</li>
        <li>허위리뷰 작성 시 삭제될 수 있습니다.</li>
        <li>첫번째 등록한 사진이 리스트 대표사진으로 보여집니다.</li>
      </ul>
      <form className={styles.formEdit}>
        <ul>
          <li>
            <label htmlFor="companyName">
              시공업체명<span>*</span>
            </label>
            <input
              type="text"
              name="companyName"
              id="companyName"
              className={styles.customSelect}
              onChange={edit}
              required
            />
          </li>
          <li>
            <label>
              시공날짜<span>*</span>
            </label>
            <input
              type="date"
              id="date"
              className={styles.date}
              name="date"
              onChange={(e) => setDate(e.target.value)}
            />
          </li>
          <li>
            <label>
              주거형태<span>*</span>
            </label>
            <select
              className={styles.customSelect}
              name="type"
              id="type"
              onChange={edit}
              required
              value={review.type || ''}
            >
              <option value="">주거형태선택</option>
              <option value="농가주택">농가주택</option>
              <option value="전원주택">전원주택</option>
              <option value="아파트/빌라">아파트/빌라</option>
            </select>
          </li>
          <li>
            <label>
              스타일<span>*</span>
            </label>
            <select
              className={styles.customSelect}
              name="style"
              id="style"
              onChange={edit}
              required
              value={review.style || ''}
            >
              <option value="">스타일선택</option>
              <option value="모던">모던</option>
              <option value="우드">우드</option>
              <option value="내추럴">내추럴</option>
              <option value="클래식&엔틱">클래식&엔틱</option>
              <option value="레트로&빈티지">레트로&빈티지</option>
              <option value="미니멀">미니멀</option>
            </select>
          </li>
          <li>
            <label>
              평수<span>*</span>
            </label>
            <div className={styles.inputTextWrap}>
              <input
                type="text"
                name="size"
                id="size"
                className={styles.customSelect}
                onChange={edit}
                value={review.size || ''}
                required
              />
              <p>평</p>
            </div>
          </li>
          <li>
            <label>
              지역<span>*</span>
            </label>
            <div className={styles.radioGroup}>
              {area.map((location) => (
                <label htmlFor={location} key={location}>
                  <input
                    type="radio"
                    id={location}
                    name="location"
                    value={location}
                    onChange={edit}
                    checked={review.location === location}
                  />
                  {location}
                </label>
              ))}
            </div>
          </li>
        </ul>
        <div className={styles.item}>
          <label>
            일반 사진<span>*</span>
            <br />
            (최소 1장, 최대8장)
          </label>
          <div className={styles.imgBtnWrap}>
            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={fileChange}
              ref={fRef}
              multiple
            />
            <button
              className={styles.addImgBtn}
              type="button"
              onClick={onClickImageUpload}
            >
              <FiPlus size={18} />
              사진 추가
            </button>
            <div className={styles.imgsWrap}>
              {fileList.map((file, i) => (
                <div key={i} className={styles.imgCancelWrap}>
                  <MdCancel
                    size={25}
                    className={styles.cancelBtn}
                    onClick={() => delFile(file)}
                  />
                  <div className={styles.imgWrap}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt="리뷰등록 이미지"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.textAreaWrap}>
          <label className={styles.reviewTitle}>
            리뷰<span>*</span>
          </label>
          <textarea
            className={styles.detailTextarea}
            name="content"
            id="content"
            placeholder="500자 이내로 리뷰를 작성해주세요."
            onChange={edit}
            maxLength={500}
            minLength={5}
            value={review.content || ''}
          />
          <p>
            <span className={styles.textCount}>{textCount}</span> / 500
          </p>
        </div>
        <div className={styles.submitBtnWrap}>
          {contextHolder}
          <Button01 size="small" type="submit" onClick={submit}>
            등록하기
          </Button01>
          <Button01
            size="small"
            color="sub"
            type="button"
            onClick={() => navigate(-1)}
          >
            취소하기
          </Button01>
        </div>
      </form>
    </div>
  );
};

export default ReviewWrite;
