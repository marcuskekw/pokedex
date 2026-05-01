import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs, VectorIcon } from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";

const activeColor = "#E3350D";
const inactiveColor = "#6B7280";

const webGlassTabBarStyle = {
  position: "absolute",
  left: 16,
  right: 16,
  bottom: 16,
  height: 68,
  paddingTop: 8,
  paddingBottom: 8,
  borderTopWidth: 0,
  borderWidth: 1,
  borderColor: "rgba(255, 255, 255, 0.54)",
  borderRadius: 24,
  backgroundColor: "rgba(255, 255, 255, 0.58)",
  backdropFilter: "blur(28px) saturate(180%)",
  boxShadow: "0 18px 44px rgba(17, 24, 39, 0.18)",
  WebkitBackdropFilter: "blur(28px) saturate(180%)",
} as const;

export default function RootLayout() {
  if (Platform.OS === "web") {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: inactiveColor,
          tabBarActiveBackgroundColor: "rgba(227, 53, 13, 0.1)",
          tabBarItemStyle: {
            borderRadius: 18,
            marginHorizontal: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "700",
          },
          tabBarStyle: webGlassTabBarStyle,
        }}
      >
        <Tabs.Screen
          name="(pokedex)"
          options={{
            title: "Pokedex",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search-circle" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="(favorites)"
          options={{
            title: "Favorites",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    );
  }

  return (
    <NativeTabs
      backgroundColor={null}
      blurEffect="systemChromeMaterial"
      iconColor={{ default: inactiveColor, selected: activeColor }}
      indicatorColor={activeColor}
      labelStyle={{
        default: {
          color: inactiveColor,
          fontSize: 12,
          fontWeight: "600",
        },
        selected: {
          color: activeColor,
          fontSize: 12,
          fontWeight: "700",
        },
      }}
      minimizeBehavior="automatic"
      rippleColor="rgba(227, 53, 13, 0.12)"
      shadowColor="rgba(17, 24, 39, 0.16)"
      tintColor={activeColor}
    >
      <NativeTabs.Trigger name="(pokedex)">
        <Label>Pokedex</Label>
        <Icon
          androidSrc={<VectorIcon family={Ionicons} name="search-circle" />}
          selectedColor={activeColor}
          sf={{ default: "magnifyingglass.circle", selected: "magnifyingglass.circle.fill" }}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(favorites)">
        <Label>Favorites</Label>
        <Icon
          androidSrc={<VectorIcon family={Ionicons} name="heart" />}
          selectedColor={activeColor}
          sf={{ default: "heart", selected: "heart.fill" }}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
