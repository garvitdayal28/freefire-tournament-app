import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex-1 bg-[#0a0e17]">
      <StatusBar style="light" />
      <LinearGradient
        colors={["rgba(76, 29, 149, 0.6)", "rgba(30, 64, 175, 0.6)"]}
        className="absolute w-full h-full"
      />
      <View className="absolute w-full h-full">
        <View className="w-80 h-80 rounded-full bg-purple-600/20 absolute -top-20 -left-20 blur-3xl" />
        <View className="w-80 h-80 rounded-full bg-blue-600/20 absolute top-1/3 -right-20 blur-3xl" />
        <View className="w-60 h-60 rounded-full bg-indigo-600/30 absolute -bottom-10 left-1/4 blur-3xl" />
      </View>
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-1 px-6 pt-10">
              {/* Header */}
              <View className="items-center mb-8">
                <View className="bg-purple-900/30 p-4 rounded-full mb-2">
                  <MaterialCommunityIcons
                    name="sword-cross"
                    size={60}
                    color="#a855f7"
                  />
                </View>
                <Text className="text-white text-4xl font-bold mt-2">
                  SHADOW ARENA
                </Text>
                <Text className="text-purple-400 text-xl font-medium">
                  Welcome Back, Warrior
                </Text>
              </View>

              {/* Form Container with Glassmorphism */}
              <View className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-purple-500/20">
                {/* Email Input */}
                <View className="flex-row items-center bg-white/20 border border-purple-500/30 rounded-2xl px-4 py-4 mb-4">
                  <MaterialCommunityIcons
                    name="account"
                    size={20}
                    color="rgba(168, 85, 247, 0.8)"
                  />
                  <TextInput
                    placeholder="Email/Username"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    value={email}
                    onChangeText={setEmail}
                    className="text-base text-white flex-1 ml-3"
                  />
                </View>

                {/* Password Input */}
                <View className="flex-row items-center bg-white/20 border border-purple-500/30 rounded-2xl px-4 py-4">
                  <MaterialCommunityIcons
                    name="lock"
                    size={20}
                    color="rgba(168, 85, 247, 0.8)"
                  />
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    className="text-base text-white flex-1 ml-3"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={24}
                      color="rgba(255,255,255,0.8)"
                    />
                  </TouchableOpacity>
                </View>

                {/* Forgot Password */}
                <TouchableOpacity className="self-end mt-4">
                  <Text className="text-purple-300 font-medium">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity
                  className="mt-8"
                  onPress={() => router.replace("/user")}
                >
                  <LinearGradient
                    colors={["#7c3aed", "#4c1d95"]}
                    start={[0, 0]}
                    end={[1, 0]}
                    className="rounded-2xl py-4 flex-row items-center justify-center shadow-lg"
                  >
                    <Text className="text-white text-lg font-bold mr-3">
                      ENTER ARENA
                    </Text>
                    <View className="bg-white/30 rounded-full p-1">
                      <Ionicons name="arrow-forward" size={18} color="white" />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Social Login */}
              <View className="items-center mt-8">
                <Text className="text-white/70 mb-4 font-medium">
                  Quick Login
                </Text>
                <View className="flex-row space-x-4">
                  <TouchableOpacity className="bg-white/10 rounded-full p-4 border border-purple-500/30">
                    <FontAwesome name="google" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Sign Up Link */}
              <View className="mt-auto mb-8 items-center">
                <View className="flex-row">
                  <Text className="text-white/70">New to the arena? </Text>
                  <TouchableOpacity
                    onPress={() => {
                      router.replace("/authentication/register");
                    }}
                  >
                    <Text className="text-purple-400 font-bold">Join Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;
