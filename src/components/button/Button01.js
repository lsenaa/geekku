import styles from "./Button01.module.scss";

const Button01 = ({ children, color, size }) => {
  return (
    <button className={`${styles.btn} ${styles[color]} ${styles[size]}`}>
      {children}
    </button>
  );
};

export default Button01;
