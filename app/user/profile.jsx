import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-[#0f172a]">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1">
        <ScrollView className="p-4">
          <Text className="text-white text-2xl font-bold mb-6">Profile</Text>

          {/* Profile content would go here */}
          <View className="items-center mb-6">
            <View className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 items-center justify-center mb-3">
              <FontAwesome name="user" size={40} color="white" />
            </View>
            <Text className="text-white text-xl font-bold">User Name</Text>
            <Text className="text-gray-400">user@example.com</Text>
          </View>

          <View className="bg-[#131b2f] rounded-lg overflow-hidden mb-4">
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-700">
              <View className="flex-row items-center">
                <FontAwesome
                  name="user-circle"
                  size={24}
                  color="#9ca3af"
                  className="mr-3"
                />
                <Text className="text-white ml-3">Edit Profile</Text>
              </View>
              <FontAwesome name="chevron-right" size={16} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-700">
              <View className="flex-row items-center">
                <Ionicons
                  name="settings-outline"
                  size={24}
                  color="#9ca3af"
                  className="mr-3"
                />
                <Text className="text-white ml-3">Settings</Text>
              </View>
              <FontAwesome name="chevron-right" size={16} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center">
                <Ionicons
                  name="log-out-outline"
                  size={24}
                  color="#9ca3af"
                  className="mr-3"
                />
                <Text className="text-white ml-3">Logout</Text>
              </View>
              <FontAwesome name="chevron-right" size={16} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
