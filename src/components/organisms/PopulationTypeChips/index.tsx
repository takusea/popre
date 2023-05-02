import styles from "./styles.module.css";

import Chip from "@/components/atoms/Chip";

interface PopulationTypeChipsProps {
  currentIndex: number;
  onChange: (index: number) => void;
}

const populationTypes = ["総人口", "年少人口", "生産年齢人口", "老年人口"];

const PopulationTypeChips = ({
  currentIndex,
  onChange,
}: PopulationTypeChipsProps): JSX.Element => {
  return (
    <div className={styles.list}>
      {populationTypes.map((populationType, index) => (
        <Chip
          key={index}
          checked={currentIndex === index}
          onClick={() => onChange(index)}
        >
          {populationType}
        </Chip>
      ))}
    </div>
  );
};

export default PopulationTypeChips;
