import styles from './SampleRegister.module.scss';
import { useRef, useState } from 'react';
import '@toast-ui/editor/toastui-editor.css';
import color from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import Button01 from 'components/commons/button/Button01';
import { useLocation, useNavigate } from 'react-router';
import { axiosInToken, url } from 'lib/axios';
import { useAtomValue } from 'jotai';
import { tokenAtom, userAtom } from 'store/atoms';
import { Modal } from 'antd';
import ToastEditor from 'components/commons/ToastEditor';
import axios from 'axios';
import { MdCancel } from 'react-icons/md';

const SampleRegister = () => {
  const navigate = useNavigate();
  const token = useAtomValue(tokenAtom);
  const area = ['경기', '인천', '충청', '강원', '전라', '경상', '제주'];
  const imageInput = useRef();
  const editorRef = useRef();
  const [content, setContent] = useState('');
  const [sample, setSample] = useState({
    type: '농가주택',
    style: '모던',
    size: '',
    location: '경기',
    title: '',
  });
  const location = useLocation(); //props로 전달해주지 않았기때문에, location으로 불러온다.
  const user = useAtomValue(userAtom);
  const [coverImg, setCoverImg] = useState(null);

  const handleChange = (e) => {
    setSample({ ...sample, [e.target.name]: e.target.value });
  };

  const onChangeContent = () => {
    const text = editorRef.current?.getInstance().getHTML();
    setContent(text === '<p><br><p>' ? '' : text);
  };

  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImg(file);
    }
  };

  // 이미지 제거 핸들러
  const handleRemoveImage = () => {
    setCoverImg(null);
  };

  // 에디터 이미지 url 받아오기
  const handleImage = async (blob, callback) => {
    try {
      let formData = new FormData();
      formData.append('image', blob);

      const response = await axios.post(`${url}/editorImageUpload`, formData);

      if (response.status === 200) {
        const imageUrl = response.data;
        callback(imageUrl);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('type', sample.type);
    formData.append('style', sample.style);
    formData.append('size', sample.size);
    formData.append('location', sample.location);
    formData.append('title', sample.title);
    formData.append('content', content);
    formData.append('coverImg', coverImg);
    formData.append('companyId', user.companyId);
    axiosInToken(token)
      .post(`/company/interiorSampleRegister`, formData)
      .then((res) => {
        //console.log(res.data);
        Modal.success({
          content: '시공사례 등록이 완료되었습니다.',
        });
        navigate(`/sampleDetail/${res.data}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className={styles.regDesign}>
      <div className={styles.topText}>시공사례 등록하기</div>
      <div className={styles.title}>
        <h3>카테고리 선택</h3>
        <p>
          <span>*</span>필수 입력 항목
        </p>
      </div>
      <div className={styles.line}></div>
      <form className={styles.formEdit}>
        <ul>
          <li>
            <label htmlFor="type">
              주거형태<span>*</span>
            </label>
            <select
              className={styles.customSelect}
              name="type"
              onChange={handleChange}
            >
              <option value="농가주택">농가주택</option>
              <option value="전원주택">전원주택</option>
              <option value="아파트/빌라">아파트/빌라</option>
            </select>
          </li>
          <li>
            <label htmlFor="style">
              스타일<span>*</span>
            </label>
            <select
              className={styles.customSelect}
              name="style"
              onChange={handleChange}
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
            <label htmlFor="size">
              평수<span>*</span>
            </label>
            <div className={styles.inputTextWrap}>
              <input
                type="number"
                name="size"
                className={styles.customSelect}
                onChange={handleChange}
                value={sample.size}
              />
              <p>평</p>
            </div>
          </li>
          <li>
            <label htmlFor="style">
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
                    onChange={handleChange}
                    checked={sample.location === location}
                  />
                  {location}
                </label>
              ))}
            </div>
          </li>
        </ul>
        <div className={styles.upload}>
          {coverImg ? (
            <div className={styles.imgCancelBtnWrap}>
              <MdCancel
                size={30}
                className={styles.cancelBtn}
                onClick={handleRemoveImage}
              />
              <img
                src={URL.createObjectURL(coverImg)}
                alt="커버 이미지"
                className={styles.uploadImg}
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
        <div className={styles.titleWrap}>
          <label>
            제목<span>*</span>
          </label>
          <input
            type="text"
            name="title"
            className={styles.titleInput}
            placeholder="제목을 입력해주세요.(40자 이내)"
            maxLength="40"
            onChange={handleChange}
            value={sample.title}
          />
        </div>
        <div className={styles.editorWrap}>
          <label>
            내용<span>*</span>
          </label>
          <ToastEditor
            editorRef={editorRef}
            height="800px"
            handleImage={handleImage}
            onChange={onChangeContent}
          />
        </div>
        <div>
          <button
            type="submit"
            className={styles.submitBtn}
            onClick={handleSubmit}
          >
            등록하기
          </button>
          <Button01
            type="button"
            size="small"
            color="sub"
            onClick={() => navigate('/sampleList')}
          >
            취소하기
          </Button01>
        </div>
      </form>
    </div>
  );
};

export default SampleRegister;
