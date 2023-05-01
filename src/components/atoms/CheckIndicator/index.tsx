import styles from "./styles.module.css";

import { Check } from "react-feather";

interface CheckIndicatorProps {
  checked: boolean;
  disabled: boolean;
}

const CheckIndicator = ({
  checked,
  disabled,
}: CheckIndicatorProps): JSX.Element => {
  return (
    <>
      <input className={styles.input} type="checkbox" checked={checked}></input>
      <div
        className={`
          ${styles.check_indicator}
          ${checked ? styles.is_checked : ""}
          ${disabled ? styles.is_disabled : ""}
        `}
      >
        <Check className={styles.check_indicator__icon} />
      </div>
    </>
  );
};

export default CheckIndicator;
