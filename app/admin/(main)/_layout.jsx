import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const isWeb = Platform.OS === "web";

export default function AdminMainLayout() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const sidebarItems = [
    {
      name: "Dashboard",
      route: "/admin",
      icon: "view-dashboard",
    },
    {
      name: "Matches",
      route: "/admin/matches",
      icon: "sword-cross",
    },
    {
      name: "Player Funds",
      route: "/admin/player-funds",
      icon: "wallet",
    },
    {
      name: "Block Players",
      route: "/admin/block-players",
      icon: "account-cancel",
    },
  ];

  const Sidebar = ({ visible, onClose }) => {
    if (isWeb && width > 768) {
      // Desktop sidebar - always visible
      return (
        <View className="w-64 bg-slate-900 border-r border-purple-500/20 h-full">
          <SidebarContent items={sidebarItems} />
        </View>
      );
    }

    // Mobile sidebar - modal
    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <View className="flex-1 bg-black/50">
          <View className="w-80 bg-slate-900 h-full">
            <SidebarContent items={sidebarItems} onClose={onClose} />
          </View>
        </View>
      </Modal>
    );
  };

  const SidebarContent = ({ items, onClose }) => (
    <SafeAreaView className="flex-1">
      <View className="p-6 border-b border-purple-500/20">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-white text-xl font-bold">Admin Panel</Text>
            <Text className="text-purple-400 text-sm">Tournament Manager</Text>
          </View>
          {!isWeb && onClose && (
            <TouchableOpacity onPress={onClose} className="p-2">
              <MaterialCommunityIcons name="close" size={24} color="#a855f7" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              router.push(item.route);
              if (onClose) onClose();
            }}
            className="flex-row items-center p-4 rounded-xl mb-2 bg-white/5 border border-purple-500/10"
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={24}
              color="#a855f7"
            />
            <Text className="text-white ml-3 text-base font-medium">
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="p-4 border-t border-purple-500/20">
        <TouchableOpacity
          onPress={() => router.replace("/")}
          className="flex-row items-center p-4 bg-red-600/20 rounded-xl"
        >
          <MaterialCommunityIcons name="logout" size={24} color="#ef4444" />
          <Text className="text-red-400 ml-3 text-base font-medium">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  if (isWeb && width > 768) {
    // Desktop layout with permanent sidebar
    return (
      <View className="flex-1 flex-row bg-slate-950">
        <Sidebar visible={true} />
        <View className="flex-1">
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="matches" />
            <Stack.Screen name="player-funds" />
            <Stack.Screen name="block-players" />
          </Stack>
        </View>
      </View>
    );
  }

  // Mobile layout with modal sidebar
  return (
    <View className="flex-1 bg-slate-950">
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />

      <SafeAreaView className="flex-1">
        {/* Mobile Header */}
        <View className="flex-row items-center justify-between p-4 bg-slate-900 border-b border-purple-500/20">
          <TouchableOpacity
            onPress={() => setSidebarVisible(true)}
            className="p-2"
          >
            <MaterialCommunityIcons name="menu" size={24} color="#a855f7" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">Admin Panel</Text>
          <TouchableOpacity onPress={() => router.replace("/")} className="p-2">
            <MaterialCommunityIcons name="logout" size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>

        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="matches" />
          <Stack.Screen name="player-funds" />
          <Stack.Screen name="block-players" />
        </Stack>
      </SafeAreaView>
    </View>
  );
}
