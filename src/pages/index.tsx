import Head from "next/head";

import styles from "@/styles/Home.module.css";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { resas } from "@/lib/resas";

import PrefectureCheckList from "@/components/organisms/PrefectureCheckList";
import PopulationTypeChips from "@/components/organisms/PopulationTypeChips";

interface Props {
  prefectures: Prefecture[];
}

export default function Home({ prefectures }: Props) {
  const [checkedIndexes, setCheckedIndexes] = useState<number[]>([]);
  const [populations, setPopulations] = useState([]);
  const [populationType, setPopulationType] = useState<number>(0);

  const fetchData = useCallback(async () => {
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
      curr.data.forEach((item: { year: string; value: number }) => {
        const found = acc.find((el: { year: string }) => el.year === item.year);
        if (found) {
          found[prefectures[curr.prefCode - 1].name] = item.value;
        } else {
          acc.push({
            year: item.year,
            [prefectures[curr.prefCode - 1].name]: item.value,
          });
        }
      });

      return acc;
    }, []);

    setPopulations(result);
  }, [checkedIndexes, populationType, prefectures]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        <title>Popre</title>
        <meta
          name="description"
          content="都道府県別人口推移の情報を表示するアプリケーション"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2 className={styles.section__heading}>都道府県一覧</h2>
          <PrefectureCheckList
            prefectures={prefectures}
            checkedIndexes={checkedIndexes}
            onChange={(prefCode) => toggleCheckedIndexes(prefCode)}
          />
        </section>
        <section className={styles.section}>
          <h2 className={styles.section__heading}>人口推移</h2>
          <div className={styles.section__inner}>
            <PopulationTypeChips
              currentIndex={populationType}
              onChange={(index) => setPopulationType(index)}
            />
          </div>
          <ResponsiveContainer width="100%" height={480}>
            <LineChart
              data={populations}
              margin={{ top: 16, right: 32, left: 64 }}
            >
              {checkedIndexes.map((checkedIndex) => (
                <Line
                  key={checkedIndex}
                  type="monotone"
                  dataKey={prefectures[checkedIndex - 1].name}
                  stroke={`hsl(${Math.round(Math.random() * 360)}, 50%, 50%)`}
                  strokeWidth={2}
                  yAxisId={1}
                />
              ))}
              <XAxis dataKey="year" domain={[1960, 2045]} tickCount={10} />
              <YAxis yAxisId={1} domain={[0, 16000000]} tickCount={10} />
              <Legend />
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const response = await resas.get("/prefectures");

  const prefectures: Prefecture[] = response.data.result.map(
    (result: { prefName: any; prefCode: any }) => {
      return {
        name: result.prefName,
        code: result.prefCode,
      };
    }
  );

  return {
    props: { prefectures },
  };
}
