import styles from "./Button01.module.scss";

const Button01 = ({ children, color, size, onClick }) => {
  return (
    <button
      className={`${styles.btn} ${styles[color]} ${styles[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button01;
