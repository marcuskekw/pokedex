export type PokemonListItem = {
  id: string;
  imageUrl: string;
  name: string;
  url: string;
};

export type PokemonAbility = {
  isHidden: boolean;
  name: string;
};

export type PokemonStatName =
  | "attack"
  | "defense"
  | "hp"
  | "special-attack"
  | "special-defense"
  | "speed";

export type PokemonStat = {
  name: PokemonStatName | string;
  value: number;
};

export type PokemonDetail = {
  abilities: PokemonAbility[];
  height: number;
  id: number;
  imageUrl: string;
  name: string;
  stats: PokemonStat[];
  types: string[];
  weight: number;
};

export const pokemonStatLabels: Record<PokemonStatName, string> = {
  attack: "Attack",
  defense: "Defense",
  hp: "HP",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};
