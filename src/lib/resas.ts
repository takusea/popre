import axios from "axios";

const resas = axios.create({
  baseURL: "https://opendata.resas-portal.go.jp/api/v1",
  headers: {
    "X-API-KEY": process.env.RESAS_API_KEY,
  },
});

export const fetchPrefectures = async (): Promise<Prefecture[]> => {
  const response = await resas.get("/prefectures");
  const prefectures: Prefecture[] = response.data.result.map((prefecture) => {
    return {
      name: prefecture.prefName,
      code: prefecture.prefCode,
    };
  });
  return prefectures;
};
