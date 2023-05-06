import styles from "./styles.module.css";

import { useState } from "react";

import { Prefecture } from "@/types/Prefecture";

import CheckBox from "@/components/molecules/CheckBox";

interface PrefectureCheckListProps {
  prefectures: Prefecture[];
  onChange: (checked: boolean, prefCode: number) => void;
}

const PrefectureCheckList = ({
  prefectures,
  onChange,
}: PrefectureCheckListProps): JSX.Element => {
  const [checkedIndexes, setCheckedIndexes] = useState<number[]>([]);

  const toggleCheckedIndexes = async (prefCode: number) => {
    if (checkedIndexes.includes(prefCode)) {
      setCheckedIndexes(checkedIndexes.filter((code) => code !== prefCode));
    } else {
      setCheckedIndexes([...checkedIndexes, prefCode]);
    }
  };

  return (
    <ul className={styles.prefectures}>
      {prefectures.map((prefecture) => (
        <li className={styles.prefecture} key={prefecture.code}>
          <CheckBox
            label={prefecture.name}
            checked={checkedIndexes.includes(prefecture.code)}
            onClick={(checked) => {
              toggleCheckedIndexes(prefecture.code);
              onChange(checked, prefecture.code)}}
          />
        </li>
      ))}
    </ul>
  );
};

export default PrefectureCheckList;
