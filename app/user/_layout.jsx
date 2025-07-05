import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function UserLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgba(15, 23, 42, 0.98)",
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
          position: "absolute",
          bottom: 45,
          left: 20,
          right: 20,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "rgba(148, 163, 184, 0.1)",
          elevation: 4,
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowRadius: 8,
          shadowOffset: {
            width: 0,
            height: 4,
          },
        },
        tabBarActiveTintColor: "#a855f7", // Purple color for selected tab
        tabBarInactiveTintColor: "#64748b",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerStatusBarHeight: 100,
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center flex flex-col align-middle h-full mb-">
              <View
                className={
                  "flex items-center justify-center flex-col h-16 w-16" +
                  (focused ? " bg-purple-900/40 rounded-full shadow-lg" : "")
                }
              >
                <MaterialCommunityIcons
                  name="home-variant"
                  size={focused ? 28 : 24}
                  color={color}
                />
              </View>
              {/*  */}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center flex h-full">
              <View
                className={
                  "flex items-center justify-center flex-col h-16 w-16" +
                  (focused ? " bg-purple-900/40 rounded-full shadow-lg" : "")
                }
              >
                <MaterialCommunityIcons
                  name="wallet-outline"
                  size={focused ? 28 : 24}
                  color={color}
                />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="earnings"
        options={{
          title: "Earnings",
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center flex h-full">
              <View
                className={
                  "flex items-center justify-center flex-col h-16 w-16" +
                  (focused ? " bg-purple-900/40 rounded-full shadow-lg" : "")
                }
              >
                <MaterialCommunityIcons
                  name="cash-multiple"
                  size={focused ? 28 : 24}
                  color={color}
                />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center flex h-full">
              <View
                className={
                  "flex items-center justify-center flex-col h-16 w-16" +
                  (focused ? " bg-purple-900/40 rounded-full shadow-lg" : "")
                }
              >
                <MaterialCommunityIcons
                  name="account-outline"
                  size={focused ? 28 : 24}
                  color={color}
                />
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
