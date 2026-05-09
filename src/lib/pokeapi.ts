const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";
const POKEMON_SPRITE_BASE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

export type PokemonListItem = {
  id: string;
  imageUrl: string;
  name: string;
  url: string;
};

type PokemonListResponse = {
  results: {
    name: string;
    url: string;
  }[];
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
