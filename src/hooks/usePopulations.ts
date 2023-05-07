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
  const [fetchedPrefCodes, setFetchedPrefCodes] = useState<number[]>([]);
  const [checkedPrefCodes, setCheckedPrefCodes] = useState<number[]>([]);
  const populations = caches.filter((cache) =>
    checkedPrefCodes.includes(cache.prefCode)
  );

  const addPopulation = useCallback(
    async (prefCode: number): Promise<void> => {
      setCheckedPrefCodes((prev) => [...prev, prefCode]);

      if (!fetchedPrefCodes.includes(prefCode)) {
        setFetchedPrefCodes((prev) => [...prev, prefCode]);

        const population = await fetchPopulation(prefCode);
        setCaches((prev) => [...prev, population]);
      }
    },
    [fetchedPrefCodes]
  );

  const removePopulation = useCallback((prefCode: number): void => {
    setCheckedPrefCodes((prev) => prev.filter((code) => code !== prefCode));
  }, []);

  return { populations, addPopulation, removePopulation };
};
