import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserAuth } from "../../store/user/auth/useUserAuth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const scrollViewRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  // Get auth functions from our store
  const {
    loginWithEmail,
    loginWithGoogle,
    forgotPassword,
    isLoading,
    error,
    clearError,
  } = useUserAuth();

  // Listen for errors from auth store
  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  const handleFocus = (inputName) => {
    setActiveInput(inputName);
    setErrorMessage("");
    clearError();

    // Add slight delay to ensure keyboard is shown before scrolling
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 200, animated: true });
    }, 100);
  };

  // Handle login with email/password
  const handleLogin = async () => {
    if (!email.trim()) {
      setErrorMessage("Email is required");
      return;
    }
    if (!password.trim()) {
      setErrorMessage("Password is required");
      return;
    }

    const result = await loginWithEmail(email, password);
    if (result.success) {
      router.replace("/user");
    }
  };

  // Handle login with Google
  const handleGoogleLogin = async () => {
    const result = await loginWithGoogle();
    if (result.success) {
      router.replace("/user");
    }
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    if (!email.trim()) {
      setErrorMessage("Enter your email to reset password");
      emailInputRef.current?.focus();
      return;
    }

    Alert.prompt(
      "Reset Password",
      "We will send a password reset link to your email",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Send",
          onPress: async (confirmedEmail) => {
            const result = await forgotPassword(confirmedEmail || email);
            if (result.success) {
              Alert.alert(
                "Check your email",
                "A password reset link has been sent to your email address"
              );
            }
          },
        },
      ],
      "plain-text",
      email
    );
  };

  return (
    <View className="flex-1 bg-[#0a0e17]">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <LinearGradient
              colors={["#4c1d95", "#1e40af"]}
              start={[0, 0]}
              end={[1, 0]}
              className="px-4 py-6 rounded-b-3xl shadow-xl"
            >
              <View className="items-center mb-3">
                <View className="bg-black/30 p-3 rounded-full mb-1 border-2 border-purple-400">
                  <MaterialCommunityIcons
                    name="sword-cross"
                    size={40}
                    color="#a855f7"
                  />
                </View>
                <Text className="text-white text-3xl font-bold mt-2">
                  SHADOW ARENA
                </Text>
                <Text className="text-gray-300 text-sm font-medium">
                  Welcome Back, Warrior
                </Text>
              </View>
            </LinearGradient>

            <View className="flex-1 px-6 pt-10">
              {/* Form Container with Glassmorphism */}
              <LinearGradient
                colors={["#1e293b", "#0f172a"]}
                className="rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 p-4"
              >
                {/* Email Input */}
                <View
                  className={`flex-row items-center bg-[#0a0e17] border ${activeInput === "email" ? "border-purple-400" : "border-purple-500/30"} rounded-xl px-3 py-3 mb-3`}
                >
                  <MaterialCommunityIcons
                    name="account"
                    size={18}
                    color={
                      activeInput === "email"
                        ? "#a855f7"
                        : "rgba(168, 85, 247, 0.8)"
                    }
                  />
                  <TextInput
                    ref={emailInputRef}
                    placeholder="Email/Username"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => setActiveInput(null)}
                    className="text-sm text-white flex-1 ml-2"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                  />
                </View>

                {/* Password Input */}
                <View
                  className={`flex-row items-center bg-[#0a0e17] border ${activeInput === "password" ? "border-purple-400" : "border-purple-500/30"} rounded-xl px-3 py-3`}
                >
                  <MaterialCommunityIcons
                    name="lock"
                    size={18}
                    color={
                      activeInput === "password"
                        ? "#a855f7"
                        : "rgba(168, 85, 247, 0.8)"
                    }
                  />
                  <TextInput
                    ref={passwordInputRef}
                    placeholder="Password"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => setActiveInput(null)}
                    secureTextEntry={!showPassword}
                    className="text-sm text-white flex-1 ml-2"
                    returnKeyType="done"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={20}
                      color="rgba(255,255,255,0.8)"
                    />
                  </TouchableOpacity>
                </View>

                {/* Forgot Password */}
                <TouchableOpacity
                  className="self-end mt-2"
                  onPress={handleForgotPassword}
                >
                  <Text className="text-purple-400 text-xs font-medium">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>

                {/* Error message */}
                {errorMessage ? (
                  <View className="bg-red-900/30 rounded-lg px-3 py-2 mt-3">
                    <Text className="text-red-300 text-xs">{errorMessage}</Text>
                  </View>
                ) : null}

                {/* Login Button */}
                <TouchableOpacity
                  className="mt-5"
                  onPress={handleLogin}
                  disabled={isLoading}
                >
                  <LinearGradient
                    colors={["#7c3aed", "#4c1d95"]}
                    start={[0, 0]}
                    end={[1, 0]}
                    className={`rounded-xl py-3 flex-row items-center justify-center shadow-lg ${isLoading ? "opacity-70" : ""}`}
                  >
                    {isLoading ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      <>
                        <Text className="text-white text-sm font-bold mr-2">
                          ENTER ARENA
                        </Text>
                        <View className="bg-white/30 rounded-full p-1">
                          <Ionicons
                            name="arrow-forward"
                            size={16}
                            color="white"
                          />
                        </View>
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>

              {/* Social Login */}
              <View className="items-center mt-5">
                <Text className="text-gray-300 mb-2 text-xs font-medium">
                  Quick Login
                </Text>
                <View className="flex-row space-x-4">
                  <TouchableOpacity
                    className="bg-[#1e293b] rounded-full p-3 border border-gray-700/50"
                    onPress={handleGoogleLogin}
                    disabled={isLoading}
                  >
                    <FontAwesome name="google" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Sign Up Link */}
              <View className="mt-auto mb-4 items-center">
                <View className="flex-row">
                  <Text className="text-gray-300 text-xs">
                    New to the arena?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      router.replace("/authentication/register");
                    }}
                  >
                    <Text className="text-purple-400 text-xs font-bold">
                      Join Now
                    </Text>
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
