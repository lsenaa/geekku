import styles from './MypageInteriorModify.module.scss';
import { useEffect, useRef, useState } from 'react';
import { DatePicker } from 'antd';
import Button01 from 'components/commons/button/Button01';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useAtom, useAtomValue } from 'jotai';
import { userAtom, tokenAtom } from 'store/atoms';
import { redirect } from 'react-router';
import { axiosInToken, url } from 'lib/axios';
import { Modal } from 'antd';
import axios from 'axios';

const MypageInteriorModify = () => {
  const area = ['경기', '인천', '충청', '강원', '전라', '경상', '제주'];
  const imageInput = useRef();
  const [user, setUser] = useAtom(userAtom);
  const [textCount, setTextCount] = useState(0);
  const [imageUrl, setImageUrl] = useState();
  const [selectedLoc, setSelectedLoc] = useState([]);
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useAtom(tokenAtom);
  const [interior, setInterior] = useState({
    companyName: '',
    possiblePart: '',
    period: '',
    recentCount: '',
    repairDate: '',
    possibleLocation: '',
    file: '',
    intro: '',
    content: '',
  });
  const handlemodifySuccess = (event) => {
    event.preventDefault(); // 폼 제출 방지
    navigate('/mypageInterior');
  };

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  const onTextareaHandler = (e) => {
    setTextCount(e.target.value.length);
  };
  const edit = (e) => {
    const { name, value } = e.target;

    setInterior({ ...interior, [name]: value });
  };
  const fileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileList([...fileList, e.target.files[0]]);
    }
  };
  useEffect(() => {
    axiosInToken(token)
      .get(`${url}/company/interiorCompanyDetail`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setInterior(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleInputChange = (e) => {
    setInterior({ ...interior, [e.target.name]: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('intro', interior.nickname);
    formData.append('content', interior.phone);
    formData.append('period', interior.email);
    formData.append('possibleLocation', interior.possibleLocation);
    formData.append('possiblePart', interior.possiblePart);
    formData.append('recentCount', interior.recentCount);
    formData.append('repairDate', interior.repairDate);

    // if (coverImage != null) {
    //   formData.append('file', coverImage);
    // }

    axiosInToken(token)
      .post(`${url}/company/interiorModify`, formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setToken(res.data.token);
        Modal.success({
          content: '업체 정보가 수정되었습니다.',
        });
        redirect('${url}/user/updateUserInfo');
      })
      .catch((err) => {
        console.log('정보 수정 실패 ');
        Modal.error({
          content: '업체 정보 수정에 실패했습니다.',
        });
        redirect('${url}/user/updateUserInfo');
      });
  };

  return (
    <div className={styles.container}>
      <h2>내 업체정보 수정하기</h2>
      <section>
        <div className={styles.title}>
          <h3>업체 정보</h3>
          <p>
            <span>*</span>필수 입력 항목
          </p>
        </div>
        <hr className={styles.line} />
        <div className={styles.item}>
          <label>신청자 이름</label>
          <div className={styles.subLabelWrap}>
            <input
              type="text"
              name="interiorName"
              value={user.companyName}
              readOnly
            />
          </div>
        </div>
        <div className={styles.item}>
          <label>
            부분시공 가능 여부<span>*</span>
          </label>
          <div className={styles.radioGroup}>
            <input type="radio" id="all" name="InteriorType" value="0" />
            <label htmlFor="가능">가능</label>
            <input type="radio" id="part" name="InteriorType" value="1" />
            <label htmlFor="불가능">불가능</label>
          </div>
        </div>
        <div className={styles.item}>
          <label>
            경력<span>*</span>
          </label>
          <div>
            <input
              type="text"
              name="period"
              value={interior.period}
              onChange={edit}
              placeholder="년"
            />
          </div>
        </div>
        <div className={styles.item}>
          <label>
            최근 계약<span>*</span>
          </label>
          <input
            type="date"
            id="start"
            name="trip-start"
            value={interior.recentCount}
            onChange={edit}
            min="2020-01-01"
            max="2030-12-31"
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="repairDate">
            보수 기간<span>*</span>
          </label>
          <input
            name="repairDate"
            className={styles.customSelect}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.items}>
          <label>
            시공 가능 지역<span>*</span>
          </label>
          <div className={styles.checkboxGroup}>
            {area.map((location, i) => (
              <label htmlFor={location} key={i}>
                <input
                  type="checkbox"
                  id={location}
                  name="location"
                  value={location}
                  onChange={edit}
                  checked={interior.location === location}
                />
                {location}
              </label>
            ))}
          </div>
        </div>
        <div className={styles.upload}>
          <span>추가하기 버튼으로 커버사진을 업로드 해주세요.</span>
          <input
            type="file"
            id="fileAdd"
            accept="image/*"
            // onChange={handleFileChange}
            onChange={fileChange}
            style={{ display: 'none' }}
            ref={imageInput}
          />
          <div
            className={styles.add}
            onClick={() => {
              imageInput.current.click();
            }}
          >
            추가하기
          </div>
        </div>
      </section>
      <section>
        <h3>상세 설명</h3>
        <hr className={styles.line} />
        <div className={styles.item}>
          <label>
            한 줄 소개<span>*</span>
          </label>
          <input
            type="text"
            minLength="5"
            maxLength="40"
            onChange={edit}
            value={interior.intro}
            placeholder="리스트에 노출되는 문구입니다. 40자 이내로 작성해주세요."
            style={{ width: '100%', textAlign: 'left' }}
          />
        </div>
        <div className={styles.item}>
          <label>
            소개글<span>*</span>
            <br />
            (500자 제한)
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
        <Button01 size="small" type="submit" onClick={submit}>
          수정하기
        </Button01>
        <Button01 color="sub" size="small">
          <Link to={'/mypageInterior'}>취소하기</Link>
        </Button01>
      </div>
    </div>
  );
};
export default MypageInteriorModify;
