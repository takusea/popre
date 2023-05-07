import { PopulationTransition } from "@/types/Population";
import { Prefecture } from "@/types/Prefecture";
import axios from "axios";

const resas = axios.create({
  baseURL: "https://opendata.resas-portal.go.jp/api/v1",
  headers: {
    "X-API-KEY": process.env.RESAS_API_KEY,
  },
});

export const fetchPrefectures = async (): Promise<Prefecture[]> => {
  const response = await resas.get("/prefectures");

  const prefectures: Prefecture[] = response.data.result.map(
    (result: { prefName: string; prefCode: number }): Prefecture => {
      return {
        name: result.prefName,
        code: result.prefCode,
      };
    }
  );

  return prefectures;
};

export const fetchPopulations = async (
  prefCode: number
): Promise<PopulationTransition> => {
  const response = await resas.get(
    `/population/composition/perYear?prefCode=${prefCode}`
  );

  const result = response.data.result.data;

  const populationTransition: PopulationTransition = {
    populations: result,
    prefCode: Number(prefCode),
  };

  return populationTransition;
};
