import DaumPostcode from 'react-daum-postcode';
import styles from './AddressModal.module.scss';

export const AddressModal = ({ onComplete, onClose }) => {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <DaumPostcode
          onComplete={onComplete}
          autoClose={false}
          defaultQuery=""
          className={styles.daumPostcode}
        />
        <button onClick={onClose} className={styles.closeButton}>
          닫기
        </button>
      </div>
    </div>
  );
};
