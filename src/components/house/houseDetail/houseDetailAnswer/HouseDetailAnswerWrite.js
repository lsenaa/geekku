import styles from './HouseDetailAnswerWrite.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import Button01 from '../../../commons/button/Button01';
import { useAtomValue } from 'jotai';
import ToastEditor from 'components/commons/ToastEditor';
import { useRef, useState } from 'react';
import { axiosInToken } from 'lib/axios';
import { Modal } from 'antd';
import { tokenAtom, userAtom } from 'store/atoms';
import { url } from 'config';
import axios from 'axios';

const HouseDetailAnswerWrite = ({
  toggleModal,
  houseNum,
  setIsModalOpen,
  fetchData,
}) => {
  const user = useAtomValue(userAtom);
  const token = useAtomValue(tokenAtom);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const editorRef = useRef();

  const onChangeContent = () => {
    const text = editorRef.current?.getInstance().getHTML(); // HTML로 읽어오기
    setContent(text === '<p><br><p>' ? '' : text);
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
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();

    // 폼 데이터 검증
    if (!content || content.trim() === '') {
      Modal.error({ content: '내용을 입력하세요.' });
      return;
    }

    formData.append('houseNum', houseNum);
    formData.append('title', title);
    formData.append('content', editorRef.current?.getInstance().getHTML());
    formData.append('companyId', user.companyId);
    formData.append('companyName', user.companyName);
    formData.append('companyProfileImage', user.companyProfileImage);
    formData.append('companyPhone', user.phone);
    formData.append('companyAddress', user.companyAddress);

    axiosInToken(token)
      .post(`/houseAnswerWrite`, formData)
      .then((res) => {
        console.log(res);
        Modal.success({
          content: '집꾸 답변이 등록되었습니다.',
          onOk: () => {
            setIsModalOpen(false);
            fetchData();
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.modalContainer}>
      <div>
        <div className={styles.profile}>
          {/* <img src={`data:image/png;base64, ${user.companyProfileImage}`} /> */}
          {/* <FaUserCircle color="#6D885D" size={30} /> */}
          <p>{user.companyName}</p>
        </div>
        <div className={styles.phoneAddWrap}>
          <div className={styles.phone}>
            <p>연락처</p>
            <p>{user.phone}</p>
          </div>
          <div className={styles.address}>
            <p>주소</p>
            <p>{user.companyAddress}</p>
          </div>
        </div>
      </div>
      <input
        className={styles.answerTitle}
        placeholder="제목을 입력해주세요. (40자 이내)"
        maxLength={40}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className={styles.editorContent}>
        <ToastEditor
          editorRef={editorRef}
          height="500px"
          handleImage={handleImage}
          onChange={onChangeContent}
        />
      </div>
      <div className={styles.btnWrap}>
        <Button01 size="small" type="submit" onClick={handleSubmit}>
          작성하기
        </Button01>
        <Button01 size="small" color="sub" type="button" onClick={toggleModal}>
          취소하기
        </Button01>
      </div>
    </div>
  );
};

export default HouseDetailAnswerWrite;
