import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function UserLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#111827",
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 80,
          paddingTop: 8,
          borderBottomColor: "#fff",
          borderBottomWidth: 1,
        },
        tabBarActiveTintColor: "#FFD700", // Gold color for selected tab
        tabBarInactiveTintColor: "#9CA3AF",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`items-center justify-center ${focused ? "pb-1" : ""}`}
            >
              <FontAwesome name="home" size={24} color={color} />
              {focused && (
                <View className="h-1 w-5 bg-yellow-400 rounded-full mt-1" />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`items-center justify-center ${focused ? "pb-1" : ""}`}
            >
              <FontAwesome name="credit-card" size={24} color={color} />
              {focused && (
                <View className="h-1 w-5 bg-yellow-400 rounded-full mt-1" />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="earnings"
        options={{
          title: "Earnings",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`items-center justify-center ${focused ? "pb-1" : ""}`}
            >
              <FontAwesome name="dollar" size={24} color={color} />
              {focused && (
                <View className="h-1 w-5 bg-yellow-400 rounded-full mt-1" />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`items-center justify-center ${focused ? "pb-1" : ""}`}
            >
              <FontAwesome name="user" size={24} color={color} />
              {focused && (
                <View className="h-1 w-5 bg-yellow-400 rounded-full mt-1" />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
