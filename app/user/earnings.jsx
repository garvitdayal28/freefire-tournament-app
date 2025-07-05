import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EarningsScreen() {
  return (
    <View className="flex-1 bg-[#0a0e17]">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1">
        <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-2xl font-bold">Earnings</Text>
            <TouchableOpacity className="bg-[#1e293b] p-2 rounded-lg">
              <Feather name="calendar" size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          {/* Earnings Summary */}
          <LinearGradient
            colors={["#15803d", "#166534"]}
            start={[0, 0]}
            end={[1, 1]}
            className="rounded-2xl overflow-hidden shadow-2xl mb-6"
          >
            <View className="p-5">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-green-200 text-base font-semibold">
                  Total Earnings
                </Text>
                <TouchableOpacity className="bg-green-800/50 rounded-full px-2 py-1">
                  <Text className="text-green-100 text-xs">All Time</Text>
                </TouchableOpacity>
              </View>

              <Text className="text-white text-4xl font-bold mb-1">$0.00</Text>
              <Text className="text-green-200 text-xs">
                Participate in tournaments to start earning
              </Text>

              <View className="flex-row mt-5 justify-between">
                <View className="bg-green-800/30 rounded-lg p-3 w-[48%]">
                  <Text className="text-green-200 text-xs mb-1">
                    This Month
                  </Text>
                  <Text className="text-white text-lg font-bold">$0.00</Text>
                </View>
                <View className="bg-green-800/30 rounded-lg p-3 w-[48%]">
                  <Text className="text-green-200 text-xs mb-1">Pending</Text>
                  <Text className="text-white text-lg font-bold">$0.00</Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Quick Stats */}
          <View className="flex-row justify-between mb-6">
            <LinearGradient
              colors={["#1e293b", "#0f172a"]}
              className="w-[31%] rounded-xl p-3 border border-gray-700/30"
            >
              <View className="items-center">
                <View className="bg-purple-900/30 p-2 rounded-lg mb-1">
                  <MaterialCommunityIcons
                    name="trophy-outline"
                    size={20}
                    color="#c084fc"
                  />
                </View>
                <Text className="text-gray-400 text-xs">Tournaments</Text>
                <Text className="text-white font-bold text-base">0</Text>
              </View>
            </LinearGradient>

            <LinearGradient
              colors={["#1e293b", "#0f172a"]}
              className="w-[31%] rounded-xl p-3 border border-gray-700/30"
            >
              <View className="items-center">
                <View className="bg-blue-900/30 p-2 rounded-lg mb-1">
                  <MaterialCommunityIcons
                    name="medal-outline"
                    size={20}
                    color="#60a5fa"
                  />
                </View>
                <Text className="text-gray-400 text-xs">Wins</Text>
                <Text className="text-white font-bold text-base">0</Text>
              </View>
            </LinearGradient>

            <LinearGradient
              colors={["#1e293b", "#0f172a"]}
              className="w-[31%] rounded-xl p-3 border border-gray-700/30"
            >
              <View className="items-center">
                <View className="bg-amber-900/30 p-2 rounded-lg mb-1">
                  <MaterialCommunityIcons
                    name="timer-outline"
                    size={20}
                    color="#fcd34d"
                  />
                </View>
                <Text className="text-gray-400 text-xs">Hours</Text>
                <Text className="text-white font-bold text-base">0</Text>
              </View>
            </LinearGradient>
          </View>

          {/* Earnings History */}
          <View className="mb-5">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white text-lg font-semibold">
                Earnings History
              </Text>
              <TouchableOpacity className="bg-[#1e293b] px-3 py-1 rounded-full">
                <Text className="text-purple-400 text-xs">Filter</Text>
              </TouchableOpacity>
            </View>

            <LinearGradient
              colors={["#1e293b", "#0f172a"]}
              className="rounded-2xl overflow-hidden shadow-xl border border-gray-700/30 p-5"
            >
              <View className="items-center justify-center py-8">
                <MaterialCommunityIcons
                  name="chart-timeline-variant"
                  size={48}
                  color="#4b5563"
                />
                <Text className="text-gray-400 mt-3">No earnings yet</Text>
                <Text className="text-gray-500 text-xs mt-1 text-center">
                  Complete tournaments to start earning
                </Text>

                <TouchableOpacity className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-2 rounded-xl">
                  <View className="flex-row items-center">
                    <MaterialIcons name="search" size={16} color="white" />
                    <Text className="text-white font-semibold ml-2">
                      FIND TOURNAMENTS
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
