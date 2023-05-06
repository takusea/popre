import type { NextApiResponse } from "next";

import { fetchPrefectures } from "@/lib/resas";
import { Prefecture } from "@/types/Prefecture";

export default async function handler(
  res: NextApiResponse<Prefecture[]>
) {
  const prefectures: Prefecture[] = await fetchPrefectures();
  res.status(200).json(prefectures);
}
