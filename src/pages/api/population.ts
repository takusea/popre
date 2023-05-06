import type { NextApiRequest, NextApiResponse } from "next";

import { fetchPopulations } from "@/lib/resas";
import { PopulationTransition } from "@/types/Population";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PopulationTransition>
) {
  const prefCode = Number(req.query.prefCode);
  const populationType = Number(req.query.populationType);

  const populationTransition: PopulationTransition = await fetchPopulations(prefCode, populationType);

  res.status(200).json(populationTransition);
}
