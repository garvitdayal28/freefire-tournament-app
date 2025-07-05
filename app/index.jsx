import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center bg-neutral-800 px-4">
        <Text className="text-5xl text-white font-bold">Welcome to Tournament App</Text>
      </View>
    </SafeAreaView>
  );
}
