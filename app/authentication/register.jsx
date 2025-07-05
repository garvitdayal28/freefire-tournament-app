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

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

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
            <View className="flex-1 px-6 pt-5">
              {/* Header */}
              <View className="items-center mb-6">
                <View className="bg-purple-900/30 p-3 rounded-full mb-2">
                  <MaterialCommunityIcons
                    name="shield-account"
                    size={50}
                    color="#a855f7"
                  />
                </View>
                <Text className="text-white text-3xl font-bold mt-2">
                  JOIN THE BATTLE
                </Text>
                <Text className="text-purple-400 text-base font-medium">
                  Create your warrior account
                </Text>
              </View>

              {/* Form Container with Glassmorphism */}
              <View className="bg-white/10 rounded-3xl p-6 shadow-lg border border-purple-500/20">
                {/* Name Input */}
                <View
                  className={`flex-row items-center bg-white/20 border ${errors.name ? "border-red-500" : "border-purple-500/30"} rounded-2xl px-4 py-3 mb-4`}
                >
                  <MaterialCommunityIcons
                    name="account-circle"
                    size={20}
                    color={errors.name ? "#f87171" : "rgba(168, 85, 247, 0.8)"}
                  />
                  <TextInput
                    placeholder="Full Name"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    value={name}
                    onChangeText={(text) => {
                      setName(text);
                      if (errors.name) {
                        setErrors({ ...errors, name: null });
                      }
                    }}
                    className="text-base text-white flex-1 ml-3"
                  />
                </View>

                {/* Username Input */}
                <View
                  className={`flex-row items-center bg-white/20 border ${errors.username ? "border-red-500" : "border-purple-500/30"} rounded-2xl px-4 py-3 mb-4`}
                >
                  <MaterialCommunityIcons
                    name="account-check"
                    size={20}
                    color={
                      errors.username ? "#f87171" : "rgba(168, 85, 247, 0.8)"
                    }
                  />
                  <TextInput
                    placeholder="Username"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    value={username}
                    onChangeText={(text) => {
                      setUsername(text);
                      if (errors.username) {
                        setErrors({ ...errors, username: null });
                      }
                    }}
                    className="text-base text-white flex-1 ml-3"
                  />
                </View>

                {/* Email Input */}
                <View
                  className={`flex-row items-center bg-white/20 border ${errors.email ? "border-red-500" : "border-purple-500/30"} rounded-2xl px-4 py-3 mb-4`}
                >
                  <MaterialCommunityIcons
                    name="email"
                    size={20}
                    color={errors.email ? "#f87171" : "rgba(168, 85, 247, 0.8)"}
                  />
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (errors.email) {
                        setErrors({ ...errors, email: null });
                      }
                    }}
                    keyboardType="email-address"
                    className="text-base text-white flex-1 ml-3"
                  />
                </View>

                {/* Phone Input */}
                <View
                  className={`flex-row items-center bg-white/20 border ${errors.phone ? "border-red-500" : "border-purple-500/30"} rounded-2xl px-4 py-3 mb-4`}
                >
                  <MaterialCommunityIcons
                    name="phone"
                    size={20}
                    color={errors.phone ? "#f87171" : "rgba(168, 85, 247, 0.8)"}
                  />
                  <TextInput
                    placeholder="Phone Number"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    value={phone}
                    onChangeText={(text) => {
                      setPhone(text);
                      if (errors.phone) {
                        setErrors({ ...errors, phone: null });
                      }
                    }}
                    keyboardType="phone-pad"
                    className="text-base text-white flex-1 ml-3"
                  />
                </View>

                {/* Password Input */}
                <View
                  className={`flex-row items-center bg-white/20 border ${errors.password ? "border-red-500" : "border-purple-500/30"} rounded-2xl px-4 py-3`}
                >
                  <MaterialCommunityIcons
                    name="lock"
                    size={20}
                    color={
                      errors.password ? "#f87171" : "rgba(168, 85, 247, 0.8)"
                    }
                  />
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (errors.password) {
                        setErrors({ ...errors, password: null });
                      }
                    }}
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

                {/* Error messages */}
                {Object.values(errors).length > 0 && (
                  <View className="bg-red-900/30 rounded-xl p-2 mt-4 mb-1">
                    {Object.values(errors).map((error, index) => (
                      <Text key={index} className="text-red-300 text-xs mb-1">
                        • {error}
                      </Text>
                    ))}
                  </View>
                )}

                {/* Register Button */}
                <TouchableOpacity
                  className="mt-8"
                  onPress={() => {
                    // Basic validation
                    const newErrors = {};
                    if (!name) newErrors.name = "Full name is required";
                    if (!username) newErrors.username = "Username is required";
                    if (!email) newErrors.email = "Email is required";
                    else if (!/\S+@\S+\.\S+/.test(email))
                      newErrors.email = "Email is invalid";
                    if (!phone) newErrors.phone = "Phone number is required";
                    if (!password) newErrors.password = "Password is required";
                    else if (password.length < 6)
                      newErrors.password =
                        "Password must be at least 6 characters";

                    setErrors(newErrors);

                    // If no errors, proceed with registration
                    if (Object.keys(newErrors).length === 0) {
                      // Here you would typically call your registration API
                      router.replace("/user");
                    }
                  }}
                >
                  <LinearGradient
                    colors={["#7c3aed", "#4c1d95"]}
                    start={[0, 0]}
                    end={[1, 0]}
                    className="rounded-2xl py-4 flex-row items-center justify-center shadow-lg"
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
                <Text className="text-white/70 mb-4 font-medium">
                  Quick Register
                </Text>
                <View className="flex-row space-x-4">
                  <TouchableOpacity className="bg-white/10 rounded-full p-4 border border-purple-500/30">
                    <FontAwesome name="google" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Login Link */}
              <View className="mt-auto mb-8 items-center">
                <View className="flex-row">
                  <Text className="text-white/70">Already a warrior? </Text>
                  <TouchableOpacity
                    onPress={() => router.replace("/authentication/login")}
                  >
                    <Text className="text-purple-400 font-bold">Login</Text>
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

export default RegisterScreen;
