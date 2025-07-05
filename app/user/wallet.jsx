import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WalletScreen() {
  return (
    <View className="flex-1 bg-[#0a0e17]">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1">
        <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-2xl font-bold">Wallet</Text>
            <TouchableOpacity className="bg-[#1e293b] p-2 rounded-lg">
              <Feather name="more-horizontal" size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          {/* Wallet Balance Card */}
          <LinearGradient
            colors={["#1e293b", "#0f172a"]}
            className="rounded-2xl overflow-hidden shadow-2xl border border-gray-700/30 p-5 mb-6"
          >
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="wallet-outline"
                  size={24}
                  color="#94a3b8"
                />
                <Text className="text-gray-300 text-lg font-semibold ml-2">
                  Balance
                </Text>
              </View>
              <TouchableOpacity className="bg-[#334155] px-3 py-1 rounded-full">
                <Text className="text-gray-300 text-xs">Refresh</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-amber-400 text-4xl font-bold mb-2">
              $100.00
            </Text>

            <View className="flex-row justify-between mt-4">
              <TouchableOpacity className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-3 rounded-xl flex-row items-center justify-center w-[48%]">
                <MaterialCommunityIcons
                  name="cash-plus"
                  size={18}
                  color="white"
                />
                <Text className="text-white font-bold ml-2">ADD FUNDS</Text>
              </TouchableOpacity>

              <TouchableOpacity className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 rounded-xl flex-row items-center justify-center w-[48%]">
                <MaterialCommunityIcons
                  name="cash-fast"
                  size={18}
                  color="white"
                />
                <Text className="text-white font-bold ml-2">WITHDRAW</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Quick Access */}
          <View className="flex-row justify-between mb-6">
            <TouchableOpacity className="bg-[#1e293b] rounded-xl p-4 items-center justify-center w-[30%] border border-gray-700/30">
              <View className="bg-blue-900/30 p-2 rounded-lg mb-2">
                <Ionicons name="flash" size={20} color="#60a5fa" />
              </View>
              <Text className="text-gray-300 text-xs">Quick Buy</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-[#1e293b] rounded-xl p-4 items-center justify-center w-[30%] border border-gray-700/30">
              <View className="bg-purple-900/30 p-2 rounded-lg mb-2">
                <MaterialCommunityIcons
                  name="gift-outline"
                  size={20}
                  color="#c084fc"
                />
              </View>
              <Text className="text-gray-300 text-xs">Rewards</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-[#1e293b] rounded-xl p-4 items-center justify-center w-[30%] border border-gray-700/30">
              <View className="bg-amber-900/30 p-2 rounded-lg mb-2">
                <MaterialCommunityIcons
                  name="chart-line"
                  size={20}
                  color="#fcd34d"
                />
              </View>
              <Text className="text-gray-300 text-xs">Stats</Text>
            </TouchableOpacity>
          </View>

          {/* Transaction History */}
          <View className="bg-[#1e293b] rounded-2xl p-5 border border-gray-700/30">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white text-lg font-semibold">
                Transaction History
              </Text>
              <TouchableOpacity>
                <Text className="text-purple-400 text-xs">See All</Text>
              </TouchableOpacity>
            </View>

            <View className="items-center justify-center py-8">
              <MaterialCommunityIcons
                name="history"
                size={40}
                color="#4b5563"
              />
              <Text className="text-gray-400 mt-2">No transactions yet</Text>
              <Text className="text-gray-500 text-xs mt-1 text-center">
                Your transaction history will appear here
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
