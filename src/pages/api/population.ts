import type { NextApiRequest, NextApiResponse } from "next";

import { fetchPopulations } from "@/lib/resas";
import { PopulationTransition } from "@/types/Population";

interface Error {
  error: {
    code: number;
    title: string;
    message: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PopulationTransition | Error>
) {
  const prefCode = Number(req.query.prefCode);

  if (isNaN(prefCode)) {
    return res.status(400).json({
      error: {
        code: 400,
        title: "Bad Request",
        message: "prefCodeは数値を指定してください。",
      },
    });
  }

  if (prefCode <= 0 || prefCode > 47) {
    return res.status(400).json({
      error: {
        code: 400,
        title: "Bad Request",
        message: "prefCodeは1から47の範囲を指定してください。",
      },
    });
  }

  const populationTransition = await fetchPopulations(prefCode);

  return res.status(200).json(populationTransition);
}
