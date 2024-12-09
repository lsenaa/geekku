import styles from './MypageInteriorModify.module.scss';
import { useEffect, useRef, useState } from 'react';
import { DatePicker } from 'antd';
import Button01 from 'components/commons/button/Button01';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router';
import { useAtom, useAtomValue } from 'jotai';
import { userAtom, tokenAtom } from 'store/atoms';
import { redirect } from 'react-router';
import { axiosInToken, url } from 'lib/axios';
import { Modal } from 'antd';
import { MdCancel } from 'react-icons/md';
import axios from 'axios';

const MypageInteriorModify = () => {
  const area = ['경기', '인천', '충청', '강원', '전라', '경상', '제주'];
  const imageInput = useRef();
  const [user, setUser] = useAtom(userAtom);
  const [textCount, setTextCount] = useState(0);
  const [imageUrl, setImageUrl] = useState();
  const [selectedLoc, setSelectedLoc] = useState([]);
  const [coverImage, setcoverImage] = useState(null);
  const navigate = useNavigate();
  const [token, setToken] = useAtom(tokenAtom);
  const [interior, setInterior] = useState({
    companyName: '',
    possiblePart: '',
    period: '',
    recentCount: '',
    repairDate: '',
    possibleLocation: '',
    coverImage: '',
    intro: '',
    content: '',
  });
  const location = useLocation();

  const handlemodifySuccess = (event) => {
    event.preventDefault(); // 폼 제출 방지
    navigate('/mypageInterior');
  };

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  const edit = (e) => {
    const { name, value } = e.target;
    // 숫자 소수점 1자리까지만 입력가능하도록 처리
    const sanitizedValue = value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..{1}).*/g, '$1')
      .replace(/(\..*)\./g, '$1');

    setInterior((prev) => ({ ...prev, [name]: value }));

    if (name === 'content') {
      setTextCount(value.length);
    }
  };

  useEffect(() => {
    axios
      .get(`${url}/company/interiorCompanyDetail`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        const { interior } = res.data;
        // possibleLocation을 배열로 변환
        setInterior({
          ...interior,
          possibleLocation: interior.possibleLocation
            ? interior.possibleLocation.split(',')
            : [],
        });
        setSelectedLoc(interior.possibleLocation.split(','));
      })
      .catch((err) => {
        console.error('Error loading data', err);
      });
  }, [token]);

  console.log(selectedLoc);

  const submit = async (e) => {
    e.preventDefault();
    console.log('interior', interior);
    let formData = new FormData();
    formData.append('intro', interior.intro);
    formData.append('content', interior.content);
    formData.append('period', interior.period);
    //    formData.append('possibleLocation', interior.possibleLocation);
    formData.append('possiblePart', interior.possiblePart);
    formData.append('recentCount', interior.recentCount);
    formData.append('repairDate', interior.repairDate);
    formData.append('coverImg', interior.coverImg);
    selectedLoc.forEach((location) => {
      formData.append('possibleLocation', location);
    });

    // if (coverImage != null) {
    //   formData.append('file', coverImage);
    // }

    await axiosInToken(token)
      .post(`${url}/company/interiorModify`, formData)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          navigate(-1);
          Modal.success({
            content: '업체 정보가 수정되었습니다.',
          });
        }
      })
      .catch((err) => {
        console.log('정보 수정 실패 ');
        Modal.error({
          content: '업체 정보 수정에 실패했습니다.',
        });
        // redirect('${url}/user/updateUserInfo');
      });
  };
  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setcoverImage(file);
    }
  };
  // 체크박스 변경 핸들러
  const handleLocChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // if (selectedLoc.length > 3) {
      //   setSelectedLoc([...selectedLoc, value]);
      // } else {
      //   Modal.info({
      //     content: '최대 3개 지역만 선택할 수 있습니다',
      //   });
      //   e.target.checked = false;
      //   return;
      // }
      if (selectedLoc.length >= 3) {
        // 3개 이상 선택 제한
        Modal.info({
          content: '최대 3개 지역만 선택할 수 있습니다',
        });
        e.target.checked = false; // 체크 상태 되돌리기
        return;
      }
      setSelectedLoc([...selectedLoc, value]); // 선택된 지역 추가
      setInterior((prevState) => ({
        ...prevState,
        possibleLocation: [...prevState.possibleLocation, value],
      }));
    } else {
      setSelectedLoc(
        selectedLoc.filter((possibleLocation) => possibleLocation !== value)
      );
      setInterior((prevState) => ({
        ...prevState,
        possibleLocation: prevState.possibleLocation.filter(
          (location) => location !== value
        ),
      }));
    }
  };

  // 이미지 제거 핸들러
  const handleRemoveImage = () => {
    setcoverImage(null);
  };
  const handleCertificationFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setcoverImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setInterior((prevInterior) => ({
          ...prevInterior,
          coverImagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
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
            <input
              type="radio"
              id="all"
              name="possiblePart"
              value="0"
              checked={interior.possiblePart == 0}
              onChange={edit}
            />
            <label htmlFor="all">가능</label>
            <input
              type="radio"
              id="part"
              name="possiblePart"
              value="1"
              checked={interior.possiblePart == 1}
              onChange={edit}
            />
            <label htmlFor="part">불가능</label>
          </div>
        </div>
        <div className={styles.item}>
          <label>
            경력<span>*</span>
          </label>
          <div className={styles.subLabelWrap}>
            <div className={styles.inputTextWrap}>
              <input
                type="number"
                name="period"
                value={interior.period}
                onChange={edit}
              />
              <p>년</p>
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <label>
            최근 계약<span>*</span>
          </label>
          <div className={styles.subLabelWrap}>
            <div className={styles.inputTextWrap}>
              <input
                type="number"
                name="recentCount"
                value={interior.recentCount}
                onChange={edit}
              />
              <p>건</p>
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <label htmlFor="repairDate">
            보수 기간<span>*</span>
          </label>
          <div className={styles.subLabelWrap}>
            <div className={styles.inputTextWrap}>
              <input
                type="number"
                name="repairDate"
                value={interior.repairDate}
                onChange={edit}
              />
              <p>개월</p>
            </div>
          </div>
        </div>

        <div className={styles.items}>
          <label>
            시공 가능 지역<span>*</span>
          </label>
          <div className={styles.checkboxGroup}>
            {area.map((location) => (
              <label htmlFor={location} key={location}>
                <input
                  type="checkbox"
                  className={styles.customCheck}
                  id={location}
                  name="possibleLocation"
                  value={location}
                  onChange={handleLocChange}
                  checked={selectedLoc.includes(location)} // 체크박스 상태 설정
                />
                {location}
              </label>
            ))}
          </div>
        </div>
        <div className={styles.upload}>
          {interior.coverImagePreview ? (
            <div className={styles.imgCancelBtnWrap}>
              <MdCancel
                size={30}
                className={styles.cancelBtn}
                onClick={handleRemoveImage}
              />
              <img
                src={interior.coverImagePreview}
                className={styles.imageFile}
              />
            </div>
          ) : (
            <>
              <span>추가하기 버튼으로 커버사진을 업로드 해주세요.</span>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={imageInput}
                onChange={handleImageChange}
              />
              <button
                type="button"
                onClick={onClickImageUpload}
                className={styles.addBtn}
              >
                추가하기
              </button>
            </>
          )}
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
            name="intro"
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
              value={interior.content}
              placeholder="상세 페이지에 노출되는 문구입니다. 1000자 이내로 작성해주세요."
              onChange={edit}
              name="content"
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
        <Button01 color="sub" size="small" onClick={() => navigate(-1)}>
          취소하기
        </Button01>
      </div>
    </div>
  );
};
export default MypageInteriorModify;
