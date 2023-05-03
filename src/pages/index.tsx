import Head from "next/head";
import styles from "@/styles/Home.module.css";

import PrefectureCheckList from "@/components/organisms/PrefectureCheckList";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import Chip from "@/components/atoms/Chip";
import PopulationTypeChips from "@/components/organisms/PopulationTypeChips";

interface Props {
  prefectures: Prefecture[];
}

export default function Home({ prefectures }: Props) {
  const [checkedIndexes, setCheckedIndexes] = useState<number[]>([]);
  const [populations, setPopulations] = useState([]);
  const [populationType, setPopulationType] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      });

      const pop = await Promise.all(
        checkedIndexes.map(async (checkedIndex) => {
          const response = await api.get(
            `/population?prefCode=${checkedIndex}&populationType=${populationType}`
          );

          return response.data;
        })
      );

      const result = pop.reduce((acc, curr) => {
        curr.data.forEach((item) => {
          const found = acc.find((el) => el.year === item.year);
          if (found) {
            found[prefectures[curr.prefCode].name] = item.value;
          } else {
            acc.push({
              year: item.year,
              [prefectures[curr.prefCode].name]: item.value,
            });
          }
        });

        return acc;
      }, []);

      setPopulations(result);
    }
    fetchData();
    console.log(populations);
  }, [checkedIndexes, populationType]);

  const toggleCheckedIndexes = (prefCode: number) => {
    if (checkedIndexes.includes(prefCode)) {
      setCheckedIndexes(checkedIndexes.filter((code) => code !== prefCode));
    } else {
      setCheckedIndexes([...checkedIndexes, prefCode]);
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h2>都道府県一覧</h2>
        <PrefectureCheckList
          prefectures={prefectures}
          checkedIndexes={checkedIndexes}
          onChange={(prefCode) => toggleCheckedIndexes(prefCode)}
        />
        <h2>人口推移</h2>
        <PopulationTypeChips
          currentIndex={populationType}
          onChange={(index) => setPopulationType(index)}
        />
        <LineChart
          width={1080}
          height={320}
          data={populations}
          margin={{ top: 16, right: 32, left: 64, bottom: 16 }}
        >
          {checkedIndexes.map((checkedIndex) => (
            <Line
              key={checkedIndex}
              type="monotone"
              dataKey={prefectures[checkedIndex].name}
              stroke={`hsl(${Math.round(Math.random() * 360)}, 50%, 50%)`}
              strokeWidth={2}
              yAxisId={1}
            />
          ))}
          <XAxis dataKey="year" />
          <YAxis yAxisId={1} />
          <Legend />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
        </LineChart>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  });

  const response = await api.get("/prefecture");
  const prefectures = response.data;

  return {
    props: { prefectures },
  };
}
