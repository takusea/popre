export interface PopulationTransition {
  prefCode: number;
  populations: Populations[];
}

export interface Populations {
  label: string;
  data: Population[];
}

export interface Population {
  year: number;
  value: number;
}
