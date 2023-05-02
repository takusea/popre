import styles from "./styles.module.css";

import { Check } from "react-feather";

interface CheckIndicatorProps {
  checked: boolean;
  children: string;
  onClick: () => void;
}

const CheckIndicator = ({
  checked,
  children,
  onClick,
}: CheckIndicatorProps): JSX.Element => {
  return (
    <button
      className={`${styles.chip} ${checked ? styles.is_checked : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CheckIndicator;
