import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAdminAuth } from "../../../store/admin/auth/useAdminAuth";

const AdminRegisterScreen = () => {
  const [secretKey, setSecretKey] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const {
    registerAdmin,
    error: authError,
    loading,
    clearError,
  } = useAdminAuth();

  // Clear any auth errors on component mount
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Watch for auth errors and add them to the form errors
  useEffect(() => {
    if (authError) {
      setErrors((prev) => ({ ...prev, auth: authError }));
    }
  }, [authError]);

  const validateForm = () => {
    const newErrors = {};

    if (!secretKey.trim()) {
      newErrors.secretKey = "Secret key is required";
    } else if (secretKey.length < 16) {
      newErrors.secretKey = "Secret key must be at least 16 characters";
    }

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleRegister = async () => {
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const success = await registerAdmin(username, password, secretKey);
      if (success) {
        router.replace("/admin/authentication/login");
      }
    }
  };

  return (
    <View className="flex-1 bg-[#0a0e17]">
      <StatusBar style="light" />
      <LinearGradient
        colors={["rgba(76, 29, 149, 0.7)", "rgba(30, 64, 175, 0.7)"]}
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
            <View className="flex-1 px-6 pt-6">
              {/* Back Button */}
              <TouchableOpacity
                className="self-start mb-4"
                onPress={() => router.back()}
              >
                <View className="bg-white/10 rounded-full p-3">
                  <Ionicons name="arrow-back" size={24} color="#a855f7" />
                </View>
              </TouchableOpacity>

              {/* Header */}
              <View className="items-center mb-6">
                <LinearGradient
                  colors={["rgba(124, 58, 237, 0.3)", "rgba(76, 29, 149, 0.3)"]}
                  className="p-5 rounded-full mb-2 border border-purple-500/30"
                >
                  <MaterialCommunityIcons
                    name="shield-plus"
                    size={50}
                    color="#a855f7"
                  />
                </LinearGradient>
                <Text className="text-white text-3xl font-bold mt-2">
                  ADMIN REGISTRATION
                </Text>
                <Text className="text-purple-400 text-lg font-medium">
                  Request Admin Access
                </Text>
              </View>

              {/* Form Container with Glassmorphism */}
              <View className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-purple-500/20">
                {/* Auth Error Message */}
                {errors.auth && (
                  <View className="mb-4 bg-red-500/20 border border-red-500/30 rounded-xl p-3">
                    <View className="flex-row items-start">
                      <MaterialCommunityIcons
                        name="alert-circle"
                        size={20}
                        color="#f87171"
                      />
                      <Text className="text-red-300 text-sm ml-2 flex-1">
                        {errors.auth}
                      </Text>
                    </View>
                  </View>
                )}

                {/* Secret Key Input */}
                <View className="mb-4">
                  <Text className="text-purple-300 font-medium mb-2 ml-1">
                    Admin Secret Key
                  </Text>
                  <View
                    className={`flex-row items-center bg-white/10 border rounded-2xl px-4 py-3 ${
                      errors.secretKey
                        ? "border-red-500"
                        : "border-purple-500/30"
                    }`}
                  >
                    <MaterialCommunityIcons
                      name="key-variant"
                      size={20}
                      color="#a855f7"
                    />
                    <TextInput
                      placeholder="Enter admin secret key"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      value={secretKey}
                      onChangeText={(text) => {
                        setSecretKey(text);
                        if (errors.secretKey || errors.auth) {
                          setErrors((prev) => ({
                            ...prev,
                            secretKey: null,
                            auth: null,
                          }));
                        }
                      }}
                      secureTextEntry
                      className="text-base text-white flex-1 ml-3"
                    />
                  </View>
                  {errors.secretKey && (
                    <Text className="text-red-400 text-sm mt-1 ml-2">
                      {errors.secretKey}
                    </Text>
                  )}
                </View>

                {/* Username Input */}
                <View className="mb-4">
                  <Text className="text-purple-300 font-medium mb-2 ml-1">
                    Admin Username
                  </Text>
                  <View
                    className={`flex-row items-center bg-white/10 border rounded-2xl px-4 py-3 ${
                      errors.username
                        ? "border-red-500"
                        : "border-purple-500/30"
                    }`}
                  >
                    <MaterialCommunityIcons
                      name="account-tie"
                      size={20}
                      color="#a855f7"
                    />
                    <TextInput
                      placeholder="Choose admin username"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      value={username}
                      onChangeText={(text) => {
                        setUsername(text);
                        if (errors.username || errors.auth) {
                          setErrors((prev) => ({
                            ...prev,
                            username: null,
                            auth: null,
                          }));
                        }
                      }}
                      className="text-base text-white flex-1 ml-3"
                    />
                  </View>
                  {errors.username && (
                    <Text className="text-red-400 text-sm mt-1 ml-2">
                      {errors.username}
                    </Text>
                  )}
                </View>

                {/* Password Input */}
                <View className="mb-4">
                  <Text className="text-purple-300 font-medium mb-2 ml-1">
                    Password
                  </Text>
                  <View
                    className={`flex-row items-center bg-white/10 border rounded-2xl px-4 py-3 ${
                      errors.password
                        ? "border-red-500"
                        : "border-purple-500/30"
                    }`}
                  >
                    <MaterialCommunityIcons
                      name="shield-key"
                      size={20}
                      color="#a855f7"
                    />
                    <TextInput
                      placeholder="Create secure password"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        if (errors.password || errors.auth) {
                          setErrors((prev) => ({
                            ...prev,
                            password: null,
                            auth: null,
                          }));
                        }
                      }}
                      secureTextEntry={!showPassword}
                      className="text-base text-white flex-1 ml-3"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      className="bg-white/10 p-2 rounded-full"
                    >
                      <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        size={18}
                        color="#a855f7"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Text className="text-red-400 text-sm mt-1 ml-2">
                      {errors.password}
                    </Text>
                  )}
                </View>

                {/* Confirm Password Input */}
                <View className="mb-6">
                  <Text className="text-purple-300 font-medium mb-2 ml-1">
                    Confirm Password
                  </Text>
                  <View
                    className={`flex-row items-center bg-white/10 border rounded-2xl px-4 py-3 ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-purple-500/30"
                    }`}
                  >
                    <MaterialCommunityIcons
                      name="shield-check"
                      size={20}
                      color="#a855f7"
                    />
                    <TextInput
                      placeholder="Confirm your password"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      value={confirmPassword}
                      onChangeText={(text) => {
                        setConfirmPassword(text);
                        if (errors.confirmPassword || errors.auth) {
                          setErrors((prev) => ({
                            ...prev,
                            confirmPassword: null,
                            auth: null,
                          }));
                        }
                      }}
                      secureTextEntry={!showConfirmPassword}
                      className="text-base text-white flex-1 ml-3"
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="bg-white/10 p-2 rounded-full"
                    >
                      <Ionicons
                        name={showConfirmPassword ? "eye-off" : "eye"}
                        size={18}
                        color="#a855f7"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && (
                    <Text className="text-red-400 text-sm mt-1 ml-2">
                      {errors.confirmPassword}
                    </Text>
                  )}
                </View>

                {/* Security Notice */}
                <View className="bg-indigo-900/30 border border-indigo-500/30 rounded-xl p-3 mb-6">
                  <View className="flex-row items-start">
                    <MaterialCommunityIcons
                      name="shield-alert"
                      size={20}
                      color="#818cf8"
                    />
                    <View className="ml-2 flex-1">
                      <Text className="text-indigo-300 text-sm font-medium mb-1">
                        Security Requirements:
                      </Text>
                      <Text className="text-indigo-200 text-xs">
                        • Valid secret key required for verification{"\n"}• All
                        admin activities are logged{"\n"}• Account subject to
                        approval
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Register Button */}
                <TouchableOpacity onPress={handleRegister} disabled={loading}>
                  <LinearGradient
                    colors={["#4c1d95", "#6d28d9"]}
                    start={[0, 0]}
                    end={[1, 0]}
                    className="rounded-2xl py-4 flex-row items-center justify-center shadow-lg"
                  >
                    {loading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <>
                        <Text className="text-white text-lg font-bold mr-3">
                          REQUEST ACCESS
                        </Text>
                        <View className="bg-white/30 rounded-full p-1">
                          <Ionicons
                            name="arrow-forward"
                            size={18}
                            color="white"
                          />
                        </View>
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Login Link */}
              <View className="mt-6 mb-8 items-center">
                <View className="flex-row">
                  <Text className="text-white/70">
                    Already have admin access?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      router.replace("/admin/authentication/login");
                    }}
                  >
                    <Text className="text-purple-400 font-bold">Sign In</Text>
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

export default AdminRegisterScreen;
