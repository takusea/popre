import type { NextApiRequest, NextApiResponse } from "next";

import { resas } from "@/lib/resas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Prefecture[]>
) {
  const response = await resas.get("/prefectures");

  const prefectures: Prefecture[] = response.data.result.map(
    (result: { prefName: any; prefCode: any }) => {
      return {
        name: result.prefName,
        code: result.prefCode,
      };
    }
  );
  res.status(200).json(prefectures);
}
