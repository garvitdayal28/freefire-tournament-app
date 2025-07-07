import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  // Uncomment the line below to redirect directly to user login
  // return <Redirect href="/authentication/login" />;

  // For development/testing, show admin and user options
  return (
    <View className="flex-1 bg-slate-950 justify-center items-center p-6">
      <View className="bg-white/10 rounded-3xl p-8 w-full max-w-sm">
        <Text className="text-white text-2xl font-bold text-center mb-8">
          Tournament App
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/authentication/login")}
          className="bg-purple-600 rounded-2xl py-4 mb-4 flex-row items-center justify-center"
        >
          <MaterialCommunityIcons name="account" size={24} color="white" />
          <Text className="text-white text-lg font-bold ml-3">User Login</Text>
        </TouchableOpacity>
         <TouchableOpacity
          onPress={() => router.push("/user")}
          className="bg-red-600 rounded-2xl py-4 flex-row items-center justify-center"
        >
          <MaterialCommunityIcons name="shield-crown" size={24} color="white" />
          <Text className="text-white text-lg font-bold ml-3">User Side </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
