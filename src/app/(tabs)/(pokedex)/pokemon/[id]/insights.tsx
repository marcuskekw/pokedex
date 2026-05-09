import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from "react-native";

import { getPokemonDetail, type PokemonDetail } from "../../../../../lib/pokeapi";
import { pokemonInsightStyles as styles } from "../../../../../theme/pokemonDetails";
import { pokemonTheme, pokemonTypeColors } from "../../../../../theme/pokemon";
import { pokemonStatLabels } from "../../../../../types/pokemon";

const { colors } = pokemonTheme;

function formatPokemonName(name: string) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatStatName(name: string) {
  return pokemonStatLabels[name as keyof typeof pokemonStatLabels] ?? formatPokemonName(name);
}

function getStatValue(pokemon: PokemonDetail, statName: string) {
  return pokemon.stats.find((stat) => stat.name === statName)?.value ?? 0;
}

export default function PokemonInsights() {
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
          setError("Could not load Pokemon insights.");
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

  const insights = useMemo(() => {
    if (!pokemon) {
      return null;
    }

    const sortedStats = [...pokemon.stats].sort((left, right) => right.value - left.value);
    const strongestStat = sortedStats[0];
    const weakestStat = sortedStats.at(-1);
    const total = pokemon.stats.reduce((sum, stat) => sum + stat.value, 0);
    const average = Math.round(total / pokemon.stats.length);
    const offense = getStatValue(pokemon, "attack") + getStatValue(pokemon, "special-attack");
    const bulk = getStatValue(pokemon, "hp") + getStatValue(pokemon, "defense") + getStatValue(pokemon, "special-defense");
    const speed = getStatValue(pokemon, "speed");

    return {
      average,
      bulk,
      offense,
      speed,
      strongestStat,
      total,
      weakestStat,
    };
  }, [pokemon]);

  if (isLoading) {
    return (
      <View style={styles.centeredState}>
        <ActivityIndicator color={colors.appRed} />
        <Text style={styles.stateText}>Loading insights...</Text>
      </View>
    );
  }

  if (error || !pokemon || !insights) {
    return (
      <View style={styles.centeredState}>
        <Text style={styles.errorText}>{error ?? "Pokemon not found."}</Text>
      </View>
    );
  }

  const primaryType = pokemon.types[0] ?? "normal";
  const primaryTypeColor = pokemonTypeColors[primaryType] ?? colors.appRed;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={[styles.hero, { backgroundColor: primaryTypeColor }]}>
        <View style={styles.heroText}>
          <Text style={styles.eyebrow}>Battle Profile</Text>
          <Text style={styles.title}>{formatPokemonName(pokemon.name)}</Text>
          <Text style={styles.subtitle}>A quick read on strengths, tempo, and stat balance.</Text>
        </View>
        <Image source={{ uri: pokemon.imageUrl }} style={styles.heroImage} resizeMode="contain" />
      </View>

      <View style={styles.summaryGrid}>
        <View style={styles.summaryTile}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={styles.summaryValue}>{insights.total}</Text>
        </View>
        <View style={styles.summaryTile}>
          <Text style={styles.summaryLabel}>Average</Text>
          <Text style={styles.summaryValue}>{insights.average}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Signature Stats</Text>
        <View style={styles.calloutRow}>
          <View style={styles.callout}>
            <Text style={styles.calloutLabel}>Strongest</Text>
            <Text style={styles.calloutTitle}>{formatStatName(insights.strongestStat.name)}</Text>
            <Text style={[styles.calloutValue, { color: primaryTypeColor }]}>{insights.strongestStat.value}</Text>
          </View>
          {insights.weakestStat ? (
            <View style={styles.callout}>
              <Text style={styles.calloutLabel}>Lowest</Text>
              <Text style={styles.calloutTitle}>{formatStatName(insights.weakestStat.name)}</Text>
              <Text style={[styles.calloutValue, { color: primaryTypeColor }]}>{insights.weakestStat.value}</Text>
            </View>
          ) : null}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Role Shape</Text>
        <View style={styles.roleList}>
          <View style={styles.roleRow}>
            <Text style={styles.roleLabel}>Offense</Text>
            <Text style={styles.roleValue}>{insights.offense}</Text>
          </View>
          <View style={styles.roleRow}>
            <Text style={styles.roleLabel}>Bulk</Text>
            <Text style={styles.roleValue}>{insights.bulk}</Text>
          </View>
          <View style={styles.roleRow}>
            <Text style={styles.roleLabel}>Speed</Text>
            <Text style={styles.roleValue}>{insights.speed}</Text>
          </View>
        </View>
      </View>

      <Pressable style={({ pressed }) => [styles.closeButton, pressed ? styles.pressed : null]} onPress={() => router.back()}>
        <Text style={styles.closeButtonText}>Done</Text>
      </Pressable>
    </ScrollView>
  );
}
