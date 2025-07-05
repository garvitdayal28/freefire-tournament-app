import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center bg-neutral-800">
        <Text className="text-white text-2xl font-semibold">LoginScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
