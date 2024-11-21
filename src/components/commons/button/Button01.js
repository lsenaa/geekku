import styles from './Button01.module.scss';

const Button01 = ({ children, color, size, onClick, type }) => {
  return (
    <button
      className={`${styles.btn} ${styles[color]} ${styles[size]}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button01;
