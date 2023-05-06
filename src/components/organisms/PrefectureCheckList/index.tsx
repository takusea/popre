import styles from "./styles.module.css";

import { Prefecture } from "@/types/Prefecture";

import CheckBox from "@/components/molecules/CheckBox";

interface PrefectureCheckListProps {
  prefectures: Prefecture[];
  checkedIndexes: number[];
  onChange: (checked: boolean, prefCode: number) => void;
}

const PrefectureCheckList = ({
  prefectures,
  checkedIndexes = [],
  onChange,
}: PrefectureCheckListProps): JSX.Element => {
  return (
    <ul className={styles.prefectures}>
      {prefectures.map((prefecture) => (
        <li className={styles.prefecture} key={prefecture.code}>
          <CheckBox
            label={prefecture.name}
            checked={checkedIndexes.includes(prefecture.code)}
            onClick={(checked) => {onChange(checked, prefecture.code)}}
          />
        </li>
      ))}
    </ul>
  );
};

export default PrefectureCheckList;
