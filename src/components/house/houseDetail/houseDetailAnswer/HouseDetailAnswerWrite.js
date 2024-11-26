import styles from './HouseDetailAnswerWrite.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import Button01 from '../../../commons/button/Button01';
import { useAtomValue } from 'jotai';
import ToastEditor from 'components/commons/ToastEditor';
import { useRef } from 'react';
import { axiosInToken } from 'config';
import { Modal } from 'antd';
import { tokenAtom, userAtom } from 'store/atoms';

const HouseDetailAnswerWrite = ({ toggleModal, houseNum }) => {
  const user = useAtomValue(userAtom);
  const token = useAtomValue(tokenAtom);
  const editorRef = useRef();
  // console.log(user);

  // console.log(editorRef.current.getInstance().getHTML()); // HTML로 읽어오기
  // console.log(editorRef.current?.getInstance().getMarkdown()); // Markdown 으로 읽어오기

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append('houseNum', houseNum);
    formData.append('content', editorRef.current.getInstance().getHTML());
    formData.append('companyId', user.userId);
    formData.append('companyName', user.companyName);
    formData.append('companyProfileImage', user.companyProfileImage);
    formData.append('companyPhone', user.companyPhone);
    formData.append('companyAddress', user.companyAddress);

    axiosInToken(token)
      .post(`/company/houseAnswerWrite`, formData)
      .then((res) => {
        console.log(res);
        Modal.success({
          content: '집꾸 답변이 등록되었습니다.',
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
      <div className={styles.editorContent}>
        <ToastEditor
          editorRef={editorRef}
          placeholder="내용을 입력해주세요."
          // onChange={handleEditor}
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
