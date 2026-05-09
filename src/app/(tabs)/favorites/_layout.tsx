import { Stack } from "expo-router";

export default function FavoritesLayout() {
  return (
    <Stack
      screenOptions={{
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
      <Stack.Screen name="index" options={{ title: "Favorites" }} />
    </Stack>
  );
}
