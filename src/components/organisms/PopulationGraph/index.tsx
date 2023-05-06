import styles from "./styles.module.css";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Legend, Tooltip, CartesianGrid, Label } from "recharts";

import { Prefecture } from "@/types/Prefecture";
import { PopulationTransition } from "@/types/Population";

interface PopulationGraphProps {
  populations: PopulationTransition[];
  populationType: number;
  prefectures: Prefecture[];
}

interface graphData {
  year: number;
  [key: string]: number;
}

const PopulationGraph = ({
  populations,
  populationType,
  prefectures,
}: PopulationGraphProps): JSX.Element => {
  const graphData: graphData[] = populations.reduce((acc: graphData[], current) => {
    current.populations[populationType].data.forEach((item) => {
      const found = acc.find((el) => el.year === item.year);
      if (found) {
        found[prefectures[current.prefCode - 1].name] = item.value / 10000;
      } else {
        acc.push({
          year: item.year,
          [prefectures[current.prefCode - 1].name]: item.value / 10000,
        });
      }
    });

    return acc;
  }, []);

  if(graphData.length > 0) {
    return (
      <ResponsiveContainer width="100%" height={480}>
        <LineChart
          data={graphData}
          margin={{ top: 40, right: 64, left: 16 }}
        >
          {populations.map((population) => (
            <Line
              key={population.prefCode}
              type="monotone"
              dataKey={prefectures[population.prefCode - 1].name}
              stroke={`hsl(${(population.prefCode / 47 * 360)}, 75%, 50%)`}
              strokeWidth={2}
              yAxisId={1}
              animationDuration={200}
              />
          ))}
          <XAxis dataKey="year" domain={[1960, 2045]} tickCount={10}>
            <Label value="年度" offset={30} position="right" />
          </XAxis>
          <YAxis yAxisId={1} tickCount={10}>
            <Label value="人口（万）" offset={24} position="top" />
          </YAxis>
          <Legend />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
        </LineChart>
      </ResponsiveContainer>
    );
  } else {
    return (
      <div className={styles.empty}>都道府県を選択してください。</div>
    )
  }
};

export default PopulationGraph;
