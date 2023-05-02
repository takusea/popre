import axios from "axios";

export const resas = axios.create({
  baseURL: "https://opendata.resas-portal.go.jp/api/v1",
  headers: {
    "X-API-KEY": process.env.RESAS_API_KEY,
  },
});
