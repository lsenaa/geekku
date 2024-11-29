import styles from './ToggleSwitch.module.scss';

const ToggleSwitch = ({ isChecked, onToggle }) => {
  const toggleSwitch = () => onToggle(!isChecked);

  return (
    <div className={styles.toggleDiv}>
      <input
        type="checkbox"
        id="toggle"
        className={styles.toggleInput}
        checked={isChecked}
        onChange={toggleSwitch}
      />
      <label htmlFor="toggle" className={styles.toggleLabel}></label>
      <span className={styles.toggleSpan}>
        {isChecked ? '[기업]' : '[개인]'}
      </span>
    </div>
  );
};
export default ToggleSwitch;
