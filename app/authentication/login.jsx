import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <LinearGradient
      colors={["#1a103d", "#2e1065", "#1e1b4b"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <View className="absolute w-full h-full">
        <View className="w-60 h-60 rounded-full bg-purple-500/20 absolute -top-20 -left-20 blur-2xl" />
        <View className="w-60 h-60 rounded-full bg-blue-500/20 absolute top-1/3 -right-20 blur-2xl" />
        <View className="w-60 h-60 rounded-full bg-purple-500/20 absolute -bottom-20 -left-20 blur-2xl" />
      </View>
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-6 pt-10">
          {/* Header */}
          <View className="mb-12">
            <Text className="text-white text-4xl font-bold">Tournament</Text>
            <Text className="text-purple-400 text-5xl font-bold">
              Login
              <MaterialCommunityIcons
                name="gamepad-variant"
                size={40}
                color="#a855f7"
              />
            </Text>
          </View>

          {/* Form Container with Glassmorphism */}
          <View className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-lg">
            {/* Email Input */}
            <View className="bg-white/20 border border-purple-500/30 rounded-2xl px-4 py-4 mb-4">
              <TextInput
                placeholder="Email/Username"
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={email}
                onChangeText={setEmail}
                className="text-base text-white"
              />
            </View>

            {/* Password Input */}
            <View className="bg-white/20 border border-purple-500/30 rounded-2xl px-4 py-4 flex-row items-center justify-between">
              <TextInput
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                className="text-base text-white flex-1"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="rgba(255,255,255,0.8)"
                />
              </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity className="self-end mt-4">
              <Text className="text-purple-300">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              className="mt-6"
              onPress={() => router.replace("/user")}
            >
              <LinearGradient
                colors={["#7c3aed", "#a855f7"]}
                className="rounded-2xl py-4 flex-row items-center justify-center"
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
            <Text className="text-white/60 mb-4">Quick Login</Text>
            <View className="flex-row space-x-4">
              <TouchableOpacity className="bg-white/10 rounded-full p-4 border border-purple-500/30">
                <FontAwesome name="google" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Link */}
          <View className="mt-auto mb-8 items-center">
            <View className="flex-row">
              <Text className="text-white/60">New to the arena? </Text>
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
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;
