import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0a0e17]">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1">
        <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-2xl font-bold">Profile</Text>
            <TouchableOpacity className="bg-[#1e293b] p-2 rounded-lg">
              <MaterialIcons name="edit" size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          {/* Profile Header */}
          <LinearGradient
            colors={["#1e293b", "#0f172a"]}
            className="rounded-2xl overflow-hidden shadow-2xl border border-gray-700/30 p-6 mb-6"
          >
            <View className="items-center">
              <View className="relative">
                <LinearGradient
                  colors={["#7e22ce", "#1e40af"]}
                  className="w-28 h-28 rounded-full p-1"
                >
                  <View className="w-full h-full rounded-full bg-[#1e293b] items-center justify-center overflow-hidden border-4 border-[#1e293b]">
                    <FontAwesome name="user" size={50} color="#94a3b8" />
                  </View>
                </LinearGradient>
                <View className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-[#1e293b]" />
              </View>

              <View className="mt-4 items-center">
                <Text className="text-white text-xl font-bold">
                  SHADOW WARRIOR
                </Text>
                <Text className="text-gray-400">user@example.com</Text>

                <View className="bg-[#0f172a] px-4 py-1 rounded-full mt-2 flex-row items-center">
                  <MaterialCommunityIcons
                    name="shield-star"
                    size={14}
                    color="#fcd34d"
                  />
                  <Text className="text-yellow-400 font-semibold text-xs ml-1">
                    ELITE PLAYER
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row justify-between mt-6 bg-[#0f172a] rounded-xl p-4">
              <View className="items-center">
                <Text className="text-gray-400 text-xs">Total Matches</Text>
                <Text className="text-white font-bold text-xl">24</Text>
              </View>

              <View className="items-center">
                <Text className="text-gray-400 text-xs">Win Rate</Text>
                <Text className="text-green-400 font-bold text-xl">68%</Text>
              </View>

              <View className="items-center">
                <Text className="text-gray-400 text-xs">Rank</Text>
                <Text className="text-purple-400 font-bold text-xl">Gold</Text>
              </View>
            </View>
          </LinearGradient>

          <Text className="text-gray-300 font-semibold mb-3 ml-1">
            Account Settings
          </Text>

          {/* Menu Items */}
          <View className="bg-[#1e293b] rounded-2xl overflow-hidden mb-4 border border-gray-700/30">
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-700/30">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-lg bg-purple-900/30 items-center justify-center">
                  <MaterialCommunityIcons
                    name="account-edit"
                    size={22}
                    color="#c084fc"
                  />
                </View>
                <Text className="text-white ml-3 font-medium">
                  Edit Profile
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="#94a3b8"
              />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-700/30">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-lg bg-blue-900/30 items-center justify-center">
                  <MaterialIcons name="security" size={22} color="#60a5fa" />
                </View>
                <Text className="text-white ml-3 font-medium">Security</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="#94a3b8"
              />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-700/30">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-lg bg-indigo-900/30 items-center justify-center">
                  <Ionicons
                    name="notifications-outline"
                    size={22}
                    color="#818cf8"
                  />
                </View>
                <Text className="text-white ml-3 font-medium">
                  Notifications
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="#94a3b8"
              />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-lg bg-gray-800/50 items-center justify-center">
                  <Ionicons name="settings-outline" size={22} color="#94a3b8" />
                </View>
                <Text className="text-white ml-3 font-medium">Settings</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="#94a3b8"
              />
            </TouchableOpacity>
          </View>

          <Text className="text-gray-300 font-semibold mb-3 ml-1">
            More Options
          </Text>

          <View className="bg-[#1e293b] rounded-2xl overflow-hidden mb-8 border border-gray-700/30">
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-700/30">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-lg bg-amber-900/30 items-center justify-center">
                  <MaterialIcons
                    name="help-outline"
                    size={22}
                    color="#fcd34d"
                  />
                </View>
                <Text className="text-white ml-3 font-medium">
                  Help & Support
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="#94a3b8"
              />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-lg bg-red-900/30 items-center justify-center">
                  <MaterialCommunityIcons
                    name="logout"
                    size={22}
                    color="#f87171"
                  />
                </View>
                <Text className="text-white ml-3 font-medium">Logout</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="#94a3b8"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
}
