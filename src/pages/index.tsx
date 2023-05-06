import Head from "next/head";

import styles from "@/styles/Home.module.css";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { fetchPrefectures } from "@/lib/resas";
import { Prefecture } from "@/types/Prefecture";
import { PopulationTransition } from "@/types/Population";

import Header from "@/components/organisms/Header";
import PrefectureCheckList from "@/components/organisms/PrefectureCheckList";
import PopulationTypeChips from "@/components/organisms/PopulationTypeChips";
import PopulationGraph from "@/components/organisms/PopulationGraph";

interface Props {
  prefectures: Prefecture[];
}

export default function Home({ prefectures }: Props) {
  const [checkedIndexes, setCheckedIndexes] = useState<number[]>([]);
  const [populations, setPopulations] = useState<PopulationTransition[]>([]);
  const [populationType, setPopulationType] = useState<number>(0);

  const fetchData = useCallback(async () => {
    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    });

    const pop: PopulationTransition[] = await Promise.all(
      checkedIndexes.map(async (checkedIndex) => {
        const response = await api.get(
          `/population?prefCode=${checkedIndex}&populationType=${populationType}`
        );

        return response.data;
      })
    );

    setPopulations(pop);
  }, [checkedIndexes, populationType]);

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
      <Header />
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
          <PopulationGraph
            populations={populations}
            checkedIndexes={checkedIndexes}
            prefectures={prefectures}
          />
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const prefectures: Prefecture[] = await fetchPrefectures();

  return {
    props: { prefectures },
  };
}
