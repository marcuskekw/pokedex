import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Pokedex() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Text>Pokedex</Text>
      <Button
        title="Open Pikachu"
        onPress={() =>
          router.push({
            pathname: "/(pokedex)/pokemon/[id]",
            params: { id: "25" },
          })
        }
      />
    </View>
  );
}
