import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from "react-native";

import { getPokemonDetail, type PokemonDetail } from "../../../../lib/pokeapi";
import { pokemonDetailStyles as styles } from "../../../../theme/pokemonDetails";
import { pokemonTheme, pokemonTypeColors } from "../../../../theme/pokemon";
import { pokemonStatLabels } from "../../../../types/pokemon";

const STAT_MAX_VALUE = 180;
const { colors } = pokemonTheme;

function formatPokemonName(name: string) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatPokemonId(id: number) {
  return `#${id.toString().padStart(4, "0")}`;
}

function formatStatName(name: string) {
  return pokemonStatLabels[name as keyof typeof pokemonStatLabels] ?? formatPokemonName(name);
}

export default function PokemonDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const pokemonId = Array.isArray(id) ? id[0] : id;
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPokemon() {
      if (!pokemonId) {
        setError("Pokemon not found.");
        setIsLoading(false);
        return;
      }

      try {
        const result = await getPokemonDetail(pokemonId);

        if (isMounted) {
          setPokemon(result);
          setError(null);
        }
      } catch {
        if (isMounted) {
          setError("Could not load Pokemon details.");
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
  }, [pokemonId]);

  if (isLoading) {
    return (
      <View style={styles.centeredState}>
        <ActivityIndicator color={colors.appRed} />
        <Text style={styles.stateText}>Loading Pokemon...</Text>
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={styles.centeredState}>
        <Text style={styles.errorText}>{error ?? "Pokemon not found."}</Text>
      </View>
    );
  }

  const primaryType = pokemon.types[0] ?? "normal";
  const primaryTypeColor = pokemonTypeColors[primaryType] ?? colors.appRed;
  const totalStats = pokemon.stats.reduce((total, stat) => total + stat.value, 0);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: formatPokemonName(pokemon.name) }} />

      <View style={[styles.hero, { backgroundColor: primaryTypeColor }]}>
        <View style={styles.heroCopy}>
          <View style={styles.numberPill}>
            <Text style={styles.pokemonNumber}>{formatPokemonId(pokemon.id)}</Text>
          </View>
          <Text style={styles.pokemonName} adjustsFontSizeToFit numberOfLines={1}>
            {formatPokemonName(pokemon.name)}
          </Text>
          <View style={styles.typeRow}>
            {pokemon.types.map((type) => (
              <View key={type} style={styles.typeChip}>
                <Text style={styles.typeChipText}>{formatPokemonName(type)}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.imageStage}>
          <Image source={{ uri: pokemon.imageUrl }} style={styles.pokemonImage} resizeMode="contain" />
        </View>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Height</Text>
          <Text style={styles.metricValue}>{(pokemon.height / 10).toFixed(1)} m</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Weight</Text>
          <Text style={styles.metricValue}>{(pokemon.weight / 10).toFixed(1)} kg</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Abilities</Text>
        <View style={styles.abilityList}>
          {pokemon.abilities.map((ability) => (
            <View key={ability.name} style={styles.abilityChip}>
              <Text style={styles.abilityName}>{formatPokemonName(ability.name)}</Text>
              {ability.isHidden ? <Text style={styles.hiddenAbility}>Hidden</Text> : null}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Base Stats</Text>
          <View style={styles.totalPill}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{totalStats}</Text>
          </View>
        </View>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/(tabs)/(pokedex)/pokemon/[id]/insights",
              params: { id: pokemon.id.toString() },
            })
          }
          style={({ pressed }) => [styles.insightsButton, pressed ? styles.pressed : null]}
        >
          <Text style={styles.insightsButtonText}>More insights</Text>
          <Text style={styles.insightsButtonIcon}>+</Text>
        </Pressable>
        <View style={styles.statList}>
          {pokemon.stats.map((stat) => {
            const percentage = Math.min((stat.value / STAT_MAX_VALUE) * 100, 100);

            return (
              <View key={stat.name} style={styles.statRow}>
                <Text style={styles.statName}>{formatStatName(stat.name)}</Text>
                <View style={styles.statTrack}>
                  <View
                    style={[
                      styles.statFill,
                      {
                        backgroundColor: primaryTypeColor,
                        width: `${percentage}%`,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
