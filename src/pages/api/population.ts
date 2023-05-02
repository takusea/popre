import type { NextApiRequest, NextApiResponse } from "next";

import { resas } from "@/lib/resas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PopulationTransition>
) {
  const response = await resas.get(
    `/population/composition/perYear?prefCode=${req.query.prefCode}`
  );

  const populationType = Number(req.query.populationType);
  const result = response.data.result.data[populationType];

  const populationTransition: PopulationTransition = {
    data: result.data,
    prefCode: Number(req.query.prefCode),
  };
  res.status(200).json(populationTransition);
}
