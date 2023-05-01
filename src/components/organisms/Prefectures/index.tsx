import { useState } from "react";
import styles from "./styles.module.css";

import CheckBox from "@/components/molecules/CheckBox";

interface PrefectureCheckListProps {
  prefectures: Prefecture[];
}

const PrefectureCheckList = ({
  prefectures,
}: PrefectureCheckListProps): JSX.Element => {
  const [checkedIndexes, setCheckedIndexes] = useState<number[]>([]);

  return (
    <ul>
      {prefectures.map((prefecture) => (
        <li key={prefecture.code}>
          <CheckBox
            label={prefecture.name}
            checked={checkedIndexes.includes(prefecture.code)}
            onClick={() => {
              if (checkedIndexes.includes(prefecture.code)) {
                setCheckedIndexes(
                  checkedIndexes.filter((code) => code !== prefecture.code)
                );
              } else {
                setCheckedIndexes([...checkedIndexes, prefecture.code]);
              }
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default PrefectureCheckList;
