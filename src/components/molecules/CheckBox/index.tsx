import styles from "./styles.module.css";

import CheckIndicator from "@/components/atoms/CheckIndicator";
import Text from "@/components/atoms/Text";

interface CheckBoxProps {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const CheckBox = ({
  label,
  checked,
  disabled = false,
  onClick,
}: CheckBoxProps): JSX.Element => {
  return (
    <button className={styles.checkbox} onClick={onClick}>
      <CheckIndicator checked={checked} disabled={disabled} />
      <Text>{label}</Text>
    </button>
  );
};

export default CheckBox;
