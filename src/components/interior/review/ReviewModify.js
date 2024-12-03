import styles from './ReviewWrite.module.scss';
import { useEffect, useRef, useState } from 'react';
import minus from '../../../assets/images/minus.png';
import { axiosInToken, url } from 'lib/axios';
import { useLocation, useNavigate } from 'react-router';
import { useAtomValue } from 'jotai';
import { tokenAtom } from 'store/atoms';
import Button01 from 'components/commons/button/Button01';
import { Modal } from 'antd';

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
    size: '',
    content: '',
    type: '',
    style: '',
    location: '',
  });
  const [textCount, setTextCount] = useState(0);
  const fRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInToken(token)
      .get(`/user/interiorReview/${reviewNum}`)
      .then((res) => {
        console.log(res.data);
        setReview({ ...res.data });

        if (res.data.imageNums && typeof res.data.imageNums === 'string') {
          setFileNumList(res.data.imageNums.split(','));
        } else {
          setFileNumList([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const edit = (e) => {
    const { name, value } = e.target;
    console.log(name, value); // 이벤트 발생 확인

    setReview((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'content') {
      setTextCount(value.length);
    }
  };

  const fileChange = (e) => {
    if (fileList.length + fileNumList.length < 8) {
      setFileList([...fileList, e.target.files[0]]);
    } else {
      Modal.info({
        content: '최대 8장까지만 업로드 할 수 있습니다.',
      });
    }
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

    const data = new FormData();
    data.append('companyName', review.companyName);
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

    await axiosInToken(token)
      .post(`/user/mypageUserReviewUpdate/${reviewNum}`, data)
      .then((res) => {
        console.log(res.data);
        Modal.success({
          content: '인테리어 업체 리뷰수정이 완료되었습니다.',
        });
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
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
              type="number"
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
        <div className={styles.upload}>
          <span id={styles.info}>
            추가하기 버튼으로 리뷰 사진을 업로드해주세요. (최대 8장)
          </span>
          <input
            type="file"
            id="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={fileChange}
            ref={fRef}
          />
          <button
            type="button"
            onClick={onClickImageUpload}
            className={styles.addImgBtn}
          >
            추가하기
          </button>
          <div className={styles.imgsWrap}>
            {fileNumList.length !== 0 &&
              fileNumList.map((num, i) => (
                <div
                  key={i}
                  style={{ display: 'inline-block', textAlign: 'center' }}
                >
                  <img
                    style={{
                      display: 'inline-block',
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                    }}
                    src={minus}
                    alt=""
                    onClick={() => delFileNum(num)}
                  />
                  <br />
                  <img
                    src={`${url}/reviewImage/${num}`}
                    alt="리뷰 이미지"
                    className={styles.reviewImg}
                  />
                </div>
              ))}
            {fileList.length !== 0 &&
              fileList.map((file, index) => (
                <div key={index}>
                  <div style={{ display: 'inline-block', textAlign: 'center' }}>
                    <img
                      style={{
                        display: 'inline-block',
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer',
                      }}
                      src={minus}
                      alt=""
                      onClick={() => delFile(file)}
                    />
                    <br />
                    <img
                      src={URL.createObjectURL(file)}
                      alt="리뷰 이미지"
                      style={{
                        width: '100px',
                        height: '60px',
                        marginRight: '10px',
                      }}
                    />
                  </div>
                  {(index + 1) % 4 === 0 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                </div>
              ))}
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
