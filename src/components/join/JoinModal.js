import { Modal } from 'antd';
import styles from './JoinModal.module.scss';
import styles2 from './Join.module.scss';

const JoinModal = ({ open, close }) => {
  return (
    <Modal open={open} onCancel={close} footer={null} width={600}>
      <h4 className={styles2.title}>중개사무소 조회</h4>
      <hr />
      <div className={styles.modalContent}>
        <div className={styles.searchWrap}>
          <input
            type="text"
            placeholder="상호명, 대표자명, 부동산중개등록번호로 조회 할 수 있습니다."
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>검색</button>
        </div>
      </div>
      <hr />
      <div className={styles.modalContent}>
        <div className={styles.list}>
          <div className={styles.result}>
            <span>41220-2016-100009</span>
            <span>고덕홍길동공인중개사사무소</span>
            <span>송영선</span>
          </div>
        </div>

        <div className={styles.list}>
          <div className={styles.result}>
            <span>00000-2000-100000</span>
            <span>홍길동공인중개</span>
            <span>홍길동</span>
          </div>
        </div>

        <div className={styles.list}>
          <div className={styles.result}>
            <span>00000-2000-100000</span>
            <span>인천홍길동중개사무소</span>
            <span>인천홍</span>
          </div>
        </div>

        <div className={styles.list}>
          <div className={styles.result}>
            <span>00000-2000-100000</span>
            <span>배홍길동네중개사무소</span>
            <span>배홍길</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default JoinModal;
