import styles from './Button01.module.scss';

const Button01 = ({children, size}) => {
  return (
    <button className={`${styles.btn} ${styles[size]}`}>{children}</button>
  );
}

export default Button01;