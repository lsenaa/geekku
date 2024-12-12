import styles from './ReviewWrite.module.scss';
import { useEffect, useRef, useState } from 'react';
import { axiosInToken, url } from 'lib/axios';
import { useLocation, useNavigate } from 'react-router';
import { useAtomValue } from 'jotai';
import { tokenAtom } from 'store/atoms';
import Button01 from 'components/commons/button/Button01';
import { message, Modal } from 'antd';
import { MdCancel } from 'react-icons/md';
import { FiPlus } from 'react-icons/fi';

const ReviewModify = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const reviewNum = state.reviewNum;
  const area = ['경기', '인천', '충청', '강원', '전라', '경상', '제주'];
  const token = useAtomValue(tokenAtom);
  const [fileNumList, setFileNumList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [fileDelList, setFileDelList] = useState([]);
  const [review, setReview] = useState({
    companyName: '',
    date: '',
    type: '',
    style: '',
    size: '',
    content: '',
    location: '',
  });

  const [textCount, setTextCount] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const fRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInToken(token)
      .get(`/user/interiorReview/${reviewNum}`)
      .then((res) => {
        //console.log(res.data);
        setReview({ ...res.data });

        if (res.data.imageNums && typeof res.data.imageNums === 'string') {
          setFileNumList(res.data.imageNums.split(','));
        } else {
          setFileNumList([]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const edit = (e) => {
    const { name, value } = e.target;

    // 날짜 값이 'YYYY-MM-DD' 형식인지를 확인하고, 날짜 형식에 맞춰 업데이트
    if (name === 'date' && value !== '') {
      const date = new Date(value);
      setReview((prev) => ({
        ...prev,
        [name]: date.toISOString().split('T')[0], // '2024-12-27' 형식으로 저장
      }));
    } else {
      setReview((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    if (name === 'content') {
      setTextCount(value.length);
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

    if (imgFileLists.length + fileNumList.length > 8) {
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

  const delFileNum = (fn) => {
    setFileDelList([...fileDelList, fn]);
    setFileNumList([...fileNumList.filter((f) => f !== fn)]);
  };

  const onClickImageUpload = () => {
    fRef.current.click();
  };

  const submit = async (e) => {
    e.preventDefault();

    // 입력값 검증
    if (review.date === '') {
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

    if (fileList.length + fileNumList.length < 1) {
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
    data.append('date', review.date);
    data.append('size', review.size);
    data.append('content', review.content);
    data.append('type', review.type);
    data.append('style', review.style);
    data.append('location', review.location);

    for (let fn of fileDelList) {
      data.append('delFile', fn);
    }

    for (let file of fileList) {
      data.append('file', file);
    }

    if (fileList.length + fileNumList.length < 1) {
      Modal.info({
        content: '사진은 최소 1장이상 업로드해야합니다.',
      });
      return;
    }

    await axiosInToken(token)
      .post(`/user/mypageUserReviewUpdate/${reviewNum}`, data)
      .then((res) => {
        //console.log(res.data);
        Modal.success({
          content: '인테리어 업체 리뷰수정이 완료되었습니다.',
        });
        navigate(-1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className={styles.regDesign}>
      <div className={styles.topText}>인테리어 업체 리뷰 수정하기</div>
      <div className={styles.midText}>
        잠시 소중한 경험을 남겨주시면 다른 지꾸 유저들에게 큰 도움이 됩니다.
      </div>
      <ul className={styles.reviewInfo}>
        <li>인테리어와 관련없는 홍보성 정보는 입력할 수 없습니다.</li>
        <li>허위리뷰 작성 시 삭제될 수 있습니다.</li>
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
              readOnly
              value={review.companyName}
              style={{ backgroundColor: '#f2f2f2', cursor: 'not-allowed' }}
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
              value={review.date}
              onChange={edit}
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
              value={review.type}
            >
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
              value={review.style}
            >
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
            <input
              type="text"
              name="size"
              id="size"
              className={styles.customSelect}
              onChange={edit}
              required
              value={review.size}
            />
          </li>
          <li>
            <label>
              지역<span>*</span>
            </label>
            <div className={styles.radioGroup}>
              {area.map((location, i) => (
                <label htmlFor={location} key={i}>
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
              {fileNumList.length !== 0 &&
                fileNumList.map((num, i) => (
                  <div key={i} className={styles.imgCancelWrap}>
                    <MdCancel
                      size={25}
                      className={styles.cancelBtn}
                      onClick={() => delFileNum(num)}
                    />
                    <div className={styles.imgWrap}>
                      <img
                        src={`${url}/reviewImage/${num}`}
                        alt="리뷰 이미지"
                      />
                    </div>
                  </div>
                ))}
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
            리뷰(500자 제한)<span>*</span>
          </label>
          <textarea
            className={styles.detailTextarea}
            name="content"
            id="content"
            placeholder="500자 이내로 리뷰를 작성해주세요."
            onChange={edit}
            maxLength={500}
            value={review.content}
          />
          <p>
            <span className={styles.textCount}>{textCount}</span> / 500
          </p>
        </div>
        <div className={styles.submitBtnWrap}>
          {contextHolder}
          <Button01 size="small" type="submit" onClick={submit}>
            수정하기
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

export default ReviewModify;
