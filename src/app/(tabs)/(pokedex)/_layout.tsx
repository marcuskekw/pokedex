import { Stack } from "expo-router";

export default function PokedexLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: "Back",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#E3350D",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          color: "#FFFFFF",
          fontSize: 20,
          fontWeight: "800",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Pokedex" }} />
      <Stack.Screen name="pokemon/[id]" options={{ title: "Pokemon Details" }} />
      <Stack.Screen
        name="pokemon/[id]/insights"
        options={{
          headerShown: false,
          presentation: "formSheet",
        }}
      />
    </Stack>
  );
}
