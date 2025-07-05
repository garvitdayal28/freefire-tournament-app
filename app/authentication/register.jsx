import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
          <View className="mb-8">
            <Text className="text-white text-4xl font-bold">Tournament</Text>
            <Text className="text-purple-400 text-5xl font-bold">
              Register
              <MaterialCommunityIcons
                name="gamepad-variant"
                size={40}
                color="#a855f7"
              />
            </Text>
          </View>

          {/* Form Container with Glassmorphism */}
          <View className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-lg">
            {/* Name Input */}
            <View className="bg-white/20 border border-purple-500/30 rounded-2xl px-4 py-4 mb-4">
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={name}
                onChangeText={setName}
                className="text-base text-white"
              />
            </View>

            {/* Username Input */}
            <View className="bg-white/20 border border-purple-500/30 rounded-2xl px-4 py-4 mb-4">
              <TextInput
                placeholder="Username"
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={username}
                onChangeText={setUsername}
                className="text-base text-white"
              />
            </View>

            {/* Email Input */}
            <View className="bg-white/20 border border-purple-500/30 rounded-2xl px-4 py-4 mb-4">
              <TextInput
                placeholder="Email"
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                className="text-base text-white"
              />
            </View>

            {/* Phone Input */}
            <View className="bg-white/20 border border-purple-500/30 rounded-2xl px-4 py-4 mb-4">
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
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

            {/* Register Button */}
            <TouchableOpacity className="mt-6">
              <LinearGradient
                colors={["#7c3aed", "#a855f7"]}
                className="rounded-2xl py-4 flex-row items-center justify-center"
              >
                <Text className="text-white text-lg font-bold mr-3">
                  JOIN ARENA
                </Text>
                <View className="bg-white/30 rounded-full p-1">
                  <Ionicons name="arrow-forward" size={18} color="white" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Social Register */}
          <View className="items-center mt-8">
            <Text className="text-white/60 mb-4">Quick Register</Text>
            <View className="flex-row space-x-4">
              <TouchableOpacity className="bg-white/10 rounded-full p-4 border border-purple-500/30">
                <FontAwesome name="google" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Link */}
          <View className="mt-auto mb-8 items-center">
            <View className="flex-row">
              <Text className="text-white/60">Already a warrior? </Text>
              <TouchableOpacity onPress={() => router.replace("/authentication/login")}>
                <Text className="text-purple-400 font-bold">Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default RegisterScreen;