import Head from "next/head";

import styles from "@/styles/Home.module.css";

import { useState } from "react";
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
  const [populations, setPopulations] = useState<PopulationTransition[]>([]);
  const [populationType, setPopulationType] = useState<number>(0);

  const fetchPopulation = async (prefCode: number): Promise<PopulationTransition> => {
    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    });

    const response = await api.get(
      `/population?prefCode=${prefCode}`
    );

    return response.data;
  }

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
            onChange={async (checked, prefCode) => {
              if (checked) {
                setPopulations(populations.filter((population) => population.prefCode !== prefCode));
              } else {
                const population = await fetchPopulation(prefCode);

                setPopulations((prev) => [...prev, population]);
              }
            }}
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
            populationType={populationType}
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
