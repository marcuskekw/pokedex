import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from "react-native";

import { getPokemonList, type PokemonListItem } from "../../../lib/pokeapi";

const PAGE_SIZE = 25;

function formatPokemonName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default function Pokedex() {
  const router = useRouter();
  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null);
  const isLoadingMoreRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    async function loadPokemon() {
      try {
        const results = await getPokemonList();

        if (isMounted) {
          setPokemon(results);
          setError(null);
        }
      } catch {
        if (isMounted) {
          setError("Could not load Pokemon.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPokemon();

    return () => {
      isMounted = false;
    };
  }, []);

  async function loadMorePokemon() {
    if (isLoadingMoreRef.current || isLoading) {
      return;
    }

    isLoadingMoreRef.current = true;
    setIsLoadingMore(true);

    try {
      const results = await getPokemonList(PAGE_SIZE, pokemon.length);

      setPokemon((currentPokemon) => [...currentPokemon, ...results]);
      setLoadMoreError(null);
    } catch {
      setLoadMoreError("Could not load more Pokemon.");
    } finally {
      isLoadingMoreRef.current = false;
      setIsLoadingMore(false);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F8FAFC",
        padding: 16,
      }}
    >
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color="#E3350D" />
          <Text
            style={{
              color: "#6B7280",
              fontSize: 14,
              fontWeight: "600",
              marginTop: 12,
            }}
          >
            Loading Pokemon...
          </Text>
        </View>
      ) : error ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={pokemon}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            gap: 10,
            paddingBottom: 96,
          }}
          onEndReached={loadMorePokemon}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoadingMore ? (
              <ActivityIndicator
                color="#E3350D"
                style={{
                  paddingVertical: 18,
                }}
              />
            ) : loadMoreError ? (
              <Text
                style={{
                  color: "#DC2626",
                  fontSize: 14,
                  fontWeight: "600",
                  paddingVertical: 18,
                  textAlign: "center",
                }}
              >
                {loadMoreError}
              </Text>
            ) : null
          }
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/(pokedex)/pokemon/[id]",
                  params: { id: item.id },
                })
              }
              style={{
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                borderColor: "#E5E7EB",
                borderRadius: 12,
                borderWidth: 1,
                flexDirection: "row",
                gap: 12,
                paddingHorizontal: 14,
                paddingVertical: 10,
              }}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={{
                  height: 48,
                  width: 48,
                }}
              />
              <Text
                style={{
                  color: "#6B7280",
                  fontSize: 15,
                  fontWeight: "700",
                  minWidth: 32,
                  textAlign: "right",
                }}
              >
                {index + 1}.
              </Text>
              <Text
                style={{
                  color: "#111827",
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >
                {formatPokemonName(item.name)}
              </Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}
