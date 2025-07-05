import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-[#0f172a]">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1">
        <ScrollView>
          {/* Header */}
          <View className="flex-row justify-between items-center px-4 py-3">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 items-center justify-center">
                <Text className="text-white font-bold">PD</Text>
              </View>
              <Text className="text-white text-lg font-semibold ml-2">
                Welcome
              </Text>
            </View>

            <View className="flex-row items-center">
              <TouchableOpacity className="mr-4">
                <Ionicons name="notifications" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-yellow-500 px-3 py-1 rounded-lg">
                <Text className="text-black font-bold">$100</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Esport Games Section */}
          <View className="px-4 mt-6">
            <Text className="text-white text-xl font-bold mb-4">
              Esport Games
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity className="w-[48%]">
                <View className="bg-[#131b2f] rounded-lg overflow-hidden">
                  <View className="h-28 items-center justify-center">
                    <Image
                      source={require("../../assets/images/react-logo.png")}
                      className="w-24 h-24"
                      resizeMode="contain"
                    />
                    <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center">
                      <Text className="text-purple-500 text-xl font-bold mt-16">
                        SHADOWARENA
                      </Text>
                    </View>
                  </View>
                  <View className="bg-[#0d1425] py-2 items-center">
                    <Text className="text-white font-medium">1v1</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity className="w-[48%]">
                <View className="bg-[#131b2f] rounded-lg overflow-hidden">
                  <View className="h-28 items-center justify-center">
                    <Image
                      source={require("../../assets/images/react-logo.png")}
                      className="w-24 h-24"
                      resizeMode="contain"
                    />
                    <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center">
                      <Text className="text-purple-500 text-xl font-bold mt-16">
                        SHADOWARENA
                      </Text>
                    </View>
                  </View>
                  <View className="bg-[#0d1425] py-2 items-center">
                    <Text className="text-white font-medium">BR</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* My Contests Section */}
          <View className="px-4 mt-8 mb-20">
            <Text className="text-white text-xl font-bold mb-4">
              My Contests
            </Text>
            {/* Empty state or contests would go here */}
            <View className="h-60 items-center justify-center">
              <Text className="text-gray-400">No active contests</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
