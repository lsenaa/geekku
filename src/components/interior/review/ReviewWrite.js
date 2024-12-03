import styles from './ReviewWrite.module.scss';
import { useRef, useState } from 'react';
import minus from '../../../assets/images/minus.png';
import axios from 'axios';
import { axiosInToken } from 'lib/axios';
import { useNavigate } from 'react-router';
import { useAtomValue } from 'jotai';
import { tokenAtom } from 'store/atoms';

const ReviewWrite = () => {
  const navigate = useNavigate();
  const area = ['경기', '인천', '충청', '강원', '전라', '경상', '제주'];
  const token = useAtomValue(tokenAtom);
  const [selectedLoc, setSelectedLoc] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [review, setReview] = useState({
    companyName: '',
    size: '',
    content: '',
  });
  const [type, setType] = useState('');
  const [style, setStyle] = useState('');
  const fRef = useRef();
  const edit = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleLocChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      if (selectedLoc.length < 1) {
        setSelectedLoc([...selectedLoc, value]);
        console.log(setSelectedLoc);
      } else {
        alert('1개 지역만 선택할 수 있습니다.');
        e.target.checked = false;
      }
    } else {
      setSelectedLoc(selectedLoc.filter((location) => location !== value));
    }
  };

  const fileChange = (e) => {
    if (e.target.files.length > 0) {
      if (fileList.length < 8) {
        setFileList([...fileList, e.target.files[0]]);
      } else {
        alert('최대 8장까지만 업로드 할 수 있습니다.');
      }
    }
  };
  const delFile = (file) => {
    setFileList([...fileList.filter((f) => f !== file)]);
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
    data.append('type', type);
    data.append('style', style);
    data.append('location', selectedLoc);
    for (let file of fileList) {
      data.append('file', file);
    }
    console.log(type);
    console.log([...data]);
    await axiosInToken(token)
      .post(`/user/interiorReviewWrite`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.data);
        alert('리뷰등록이 완료되었습니다.');
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        alert(
          err.response.data
            ? err.response.data
            : '알 수 없는 오류가 발생했습니다.'
        );
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
      </ul>
      <form className={styles.formEdit}>
        <ul>
          <li>
            <span>시공업체명</span>
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
            <span>주거형태</span>
            <select
              className={styles.customSelect}
              name="type"
              id="type"
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="농가주택">농가주택</option>
              <option value="전원주택">전원주택</option>
              <option value="아파트/빌라">아파트/빌라</option>
            </select>
          </li>
          <li>
            <span>스타일</span>
            <select
              className={styles.customSelect}
              name="style"
              id="style"
              onChange={(e) => setStyle(e.target.value)}
              required
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
            <span>평수</span>
            <input
              name="size"
              id="size"
              className={styles.customSelect}
              onChange={edit}
              required
            />
          </li>
          <li>
            <span>지역</span>
            {area.map((location) => (
              <label
                key={location}
                className={styles.customLabel}
                htmlFor={location}
              >
                <input
                  type="checkbox"
                  className={styles.customCheck}
                  id={location}
                  value={location}
                  onChange={handleLocChange}
                />
                {location}
              </label>
            ))}
          </li>
        </ul>
        <div>
          <div className={styles.upload}>
            {fileList.length === 0 && (
              <span id={styles.info}>
                추가하기 버튼으로 리뷰 사진을 업로드해주세요. (최대 8장)
              </span>
            )}
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
              style={{ margin: '20px auto', width: '330px', height: '60px' }}
            >
              추가하기
            </button>
            <div className={styles.imageView}>
              {fileList.map((file, index) => (
                <span key={index}>
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
                      width="80px"
                      alt=""
                      // style={{ marginRight: '10px' }}
                    />
                  </div>
                  {/* {(index + 1) % 3 === 0 && (
                    <>
                      <br />
                      <br />
                    </>
                  )} */}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.reviewTitle}>리뷰(500자 제한)</div>
        <textarea
          className={styles.edt}
          name="content"
          id="content"
          placeholder="500자 이내로 리뷰를 작성해주세요."
          onChange={edit}
          maxLength={500}
        ></textarea>
        <button onClick={submit} style={{ marginLeft: '504px' }}>
          등록하기
        </button>
      </form>
    </div>
  );
};

export default ReviewWrite;
