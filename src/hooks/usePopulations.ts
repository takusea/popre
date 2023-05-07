import { useCallback, useState } from "react";

import axios from "axios";

import { PopulationTransition } from "@/types/Population";

const fetchPopulation = async (
  prefCode: number
): Promise<PopulationTransition> => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  });

  const response = await api.get(`/population?prefCode=${prefCode}`);

  return response.data;
};

export const usePopulations = () => {
  const [caches, setCaches] = useState<PopulationTransition[]>([]);
  const [prefCodes, setPrefCodes] = useState<number[]>([]);
  const populations = caches.filter((cache) =>
    prefCodes.includes(cache.prefCode)
  );

  const addPopulation = useCallback(
    async (prefCode: number): Promise<void> => {
      setPrefCodes((prev) => [...prev, prefCode]);

      if (!caches.some((cache) => cache.prefCode === prefCode)) {
        const population = await fetchPopulation(prefCode);
        setCaches((prev) => [...prev, population]);
      }
    },
    [caches]
  );

  const removePopulation = useCallback((prefCode: number): void => {
    setPrefCodes((prev) => prev.filter((code) => code !== prefCode));
  }, []);

  return { populations, addPopulation, removePopulation };
};
