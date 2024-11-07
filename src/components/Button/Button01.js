import styles from './Button01.module.scss';

const Button01 = ({text}) => {
  return (
    <button className={styles.btn}>{text}</button>
  );
}

export default Button01;