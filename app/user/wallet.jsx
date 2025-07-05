import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WalletScreen() {
  return (
    <View className="flex-1 bg-[#0f172a]">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1">
        <ScrollView className="p-4">
          <Text className="text-white text-2xl font-bold mb-6">Wallet</Text>

          {/* Wallet content would go here */}
          <View className="bg-[#131b2f] rounded-lg p-4 mb-4">
            <Text className="text-white text-lg font-semibold mb-2">
              Balance
            </Text>
            <Text className="text-yellow-500 text-3xl font-bold">$100.00</Text>
          </View>

          <View className="bg-[#131b2f] rounded-lg p-4">
            <Text className="text-white text-lg font-semibold mb-4">
              Transaction History
            </Text>
            <View className="items-center justify-center py-8">
              <Text className="text-gray-400">No transactions yet</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
