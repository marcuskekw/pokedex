import { StyleSheet } from "react-native";

import { pokemonTheme } from "./pokemon";

const { colors, radius, spacing } = pokemonTheme;

export const pokemonDetailStyles = StyleSheet.create({
  abilityChip: {
    alignItems: "center",
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  abilityList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  abilityName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
  },
  centeredState: {
    alignItems: "center",
    backgroundColor: colors.screen,
    flex: 1,
    justifyContent: "center",
  },
  content: {
    gap: 16,
    padding: spacing.page,
    paddingBottom: 112,
  },
  errorText: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: "700",
  },
  hero: {
    borderRadius: radius.hero,
    gap: 20,
    minHeight: 260,
    overflow: "hidden",
    padding: 22,
  },
  heroCopy: {
    gap: 10,
  },
  hiddenAbility: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
  },
  imageStage: {
    paddingVertical: 8,
  },
  insightsButton: {
    alignItems: "center",
    backgroundColor: colors.text,
    borderRadius: radius.tile,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  insightsButtonIcon: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "900",
  },
  insightsButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "800",
  },
  metric: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.tile,
    borderWidth: 1,
    flex: 1,
    padding: 16,
  },
  metricLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6,
  },
  metricValue: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "800",
  },
  metricsRow: {
    flexDirection: "row",
    gap: 12,
  },
  numberPill: {
    alignSelf: "flex-start",
    backgroundColor: colors.whiteWash,
    borderColor: colors.whiteBorder,
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  pokemonImage: {
    alignSelf: "center",
    height: 210,
    width: "100%",
  },
  pokemonName: {
    color: colors.white,
    fontSize: 34,
    fontWeight: "900",
  },
  pokemonNumber: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.82,
  },
  screen: {
    backgroundColor: colors.screen,
    flex: 1,
  },
  section: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: 1,
    padding: 16,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  stateText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
  },
  statFill: {
    borderRadius: radius.pill,
    height: "100%",
  },
  statList: {
    gap: 14,
  },
  statName: {
    color: colors.textSoft,
    fontSize: 13,
    fontWeight: "800",
    width: 66,
  },
  statRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  statTrack: {
    backgroundColor: colors.statTrack,
    borderRadius: radius.pill,
    flex: 1,
    height: 10,
    overflow: "hidden",
  },
  statValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800",
    textAlign: "right",
    width: 34,
  },
  totalLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "800",
  },
  totalPill: {
    alignItems: "center",
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radius.pill,
    borderWidth: 1,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  totalValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "900",
  },
  typeChip: {
    backgroundColor: colors.whiteWash,
    borderColor: colors.whiteBorder,
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  typeChipText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "800",
  },
  typeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
});

export const pokemonInsightStyles = StyleSheet.create({
  callout: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radius.tile,
    borderWidth: 1,
    flex: 1,
    padding: 14,
  },
  calloutLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 8,
  },
  calloutRow: {
    flexDirection: "row",
    gap: 12,
  },
  calloutTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 6,
  },
  calloutValue: {
    fontSize: 28,
    fontWeight: "900",
  },
  centeredState: {
    alignItems: "center",
    backgroundColor: colors.screen,
    flex: 1,
    justifyContent: "center",
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: colors.appRed,
    borderRadius: radius.tile,
    paddingVertical: 14,
  },
  closeButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "900",
  },
  content: {
    gap: 16,
    padding: spacing.page,
    paddingBottom: 32,
  },
  errorText: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: "700",
  },
  eyebrow: {
    color: colors.whiteMuted,
    fontSize: 13,
    fontWeight: "900",
  },
  hero: {
    borderRadius: radius.hero,
    flexDirection: "row",
    gap: 12,
    minHeight: 190,
    overflow: "hidden",
    padding: 20,
  },
  heroImage: {
    alignSelf: "center",
    flex: 0.9,
    height: 150,
  },
  heroText: {
    flex: 1.1,
    gap: 8,
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.82,
  },
  roleLabel: {
    color: colors.textSoft,
    fontSize: 14,
    fontWeight: "800",
  },
  roleList: {
    gap: 10,
  },
  roleRow: {
    alignItems: "center",
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.tile,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  roleValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "900",
  },
  screen: {
    backgroundColor: colors.screen,
    flex: 1,
  },
  section: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: 1,
    padding: 16,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 14,
  },
  stateText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
  },
  subtitle: {
    color: colors.whiteMuted,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
  },
  summaryGrid: {
    flexDirection: "row",
    gap: 12,
  },
  summaryLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 6,
  },
  summaryTile: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.tile,
    borderWidth: 1,
    flex: 1,
    padding: 16,
  },
  summaryValue: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "900",
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "900",
  },
});
