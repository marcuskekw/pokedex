import type { PokemonDetail, PokemonListItem } from "../types/pokemon";
export type { PokemonDetail, PokemonListItem } from "../types/pokemon";

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";
const POKEMON_SPRITE_BASE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

type PokemonListResponse = {
  results: {
    name: string;
    url: string;
  }[];
};

type PokemonDetailResponse = {
  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }[];
  height: number;
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other?: {
      "official-artwork"?: {
        front_default: string | null;
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  weight: number;
};

function getPokemonId(url: string) {
  return url.split("/").filter(Boolean).at(-1) ?? "";
}

export async function getPokemonList(limit = 25, offset = 0): Promise<PokemonListItem[]> {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon list");
  }

  const data = (await response.json()) as PokemonListResponse;

  return data.results.map((pokemon) => {
    const id = getPokemonId(pokemon.url);

    return {
      id,
      imageUrl: `${POKEMON_SPRITE_BASE_URL}/${id}.png`,
      name: pokemon.name,
      url: pokemon.url,
    };
  });
}

export async function getPokemonDetail(id: string): Promise<PokemonDetail> {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon details");
  }

  const data = (await response.json()) as PokemonDetailResponse;
  const officialArtwork = data.sprites.other?.["official-artwork"]?.front_default;

  return {
    abilities: data.abilities.map((ability) => ({
      isHidden: ability.is_hidden,
      name: ability.ability.name,
    })),
    height: data.height,
    id: data.id,
    imageUrl: officialArtwork ?? data.sprites.front_default ?? `${POKEMON_SPRITE_BASE_URL}/${data.id}.png`,
    name: data.name,
    stats: data.stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
    types: data.types.map((type) => type.type.name),
    weight: data.weight,
  };
}
