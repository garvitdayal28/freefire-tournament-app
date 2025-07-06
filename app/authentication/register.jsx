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

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeInput, setActiveInput] = useState(null);
  const scrollViewRef = useRef(null);

  const nameInputRef = useRef(null);
  const usernameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  // Get auth functions from our store
  const { registerWithEmail, loginWithGoogle, isLoading, error, clearError } =
    useUserAuth();

  // Listen for errors from auth store
  useEffect(() => {
    if (error) {
      setErrors((prev) => ({ ...prev, serverError: error }));
    }
  }, [error]);

  const handleFocus = (inputName) => {
    setActiveInput(inputName);

    // Clear field-specific errors when focused
    if (errors[inputName]) {
      setErrors((prev) => ({ ...prev, [inputName]: null }));
    }

    // Clear server errors
    if (errors.serverError) {
      setErrors((prev) => ({ ...prev, serverError: null }));
      clearError();
    }

    // Scroll positions for different inputs
    const scrollPositions = {
      name: 150,
      username: 180,
      email: 210,
      phone: 240,
      password: 270,
    };

    // Add slight delay to ensure keyboard is shown before scrolling
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: scrollPositions[inputName] || 150,
        animated: true,
      });
    }, 100);
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
              className="px-4 py-5 rounded-b-3xl shadow-xl"
            >
              <View className="items-center mb-3">
                <View className="bg-black/30 p-2 rounded-full mb-1 border-2 border-purple-400">
                  <MaterialCommunityIcons
                    name="shield-account"
                    size={32}
                    color="#a855f7"
                  />
                </View>
                <Text className="text-white text-2xl font-bold mt-2">
                  JOIN THE BATTLE
                </Text>
                <Text className="text-gray-300 text-xs font-medium">
                  Create your warrior account
                </Text>
              </View>
            </LinearGradient>

            <View className="flex-1 px-6 pt-4">
              {/* Form Container with Glassmorphism */}
              <LinearGradient
                colors={["#1e293b", "#0f172a"]}
                className="rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 p-4"
              >
                {/* Name Input */}
                <View
                  className={`flex-row items-center bg-[#0a0e17] border ${activeInput === "name" ? "border-purple-400" : errors.name ? "border-red-500" : "border-purple-500/30"} rounded-xl px-3 py-2 mb-2`}
                >
                  <MaterialCommunityIcons
                    name="account-circle"
                    size={16}
                    color={
                      errors.name
                        ? "#f87171"
                        : activeInput === "name"
                          ? "#a855f7"
                          : "rgba(168, 85, 247, 0.8)"
                    }
                  />
                  <TextInput
                    ref={nameInputRef}
                    placeholder="Full Name"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    value={name}
                    onChangeText={(text) => {
                      setName(text);
                      if (errors.name) {
                        setErrors({ ...errors, name: null });
                      }
                    }}
                    className="text-sm text-white flex-1 ml-2"
                    onFocus={() => handleFocus("name")}
                    onBlur={() => setActiveInput(null)}
                    returnKeyType="next"
                    onSubmitEditing={() => usernameInputRef.current?.focus()}
                  />
                </View>

                {/* Username Input */}
                <View
                  className={`flex-row items-center bg-[#0a0e17] border ${activeInput === "username" ? "border-purple-400" : errors.username ? "border-red-500" : "border-purple-500/30"} rounded-xl px-3 py-2 mb-2`}
                >
                  <MaterialCommunityIcons
                    name="account-check"
                    size={16}
                    color={
                      errors.username
                        ? "#f87171"
                        : activeInput === "username"
                          ? "#a855f7"
                          : "rgba(168, 85, 247, 0.8)"
                    }
                  />
                  <TextInput
                    ref={usernameInputRef}
                    placeholder="Username"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    value={username}
                    onChangeText={(text) => {
                      setUsername(text);
                      if (errors.username) {
                        setErrors({ ...errors, username: null });
                      }
                    }}
                    className="text-sm text-white flex-1 ml-2"
                    onFocus={() => handleFocus("username")}
                    onBlur={() => setActiveInput(null)}
                    returnKeyType="next"
                    onSubmitEditing={() => emailInputRef.current?.focus()}
                  />
                </View>

                {/* Email Input */}
                <View
                  className={`flex-row items-center bg-[#0a0e17] border ${activeInput === "email" ? "border-purple-400" : errors.email ? "border-red-500" : "border-purple-500/30"} rounded-xl px-3 py-2 mb-2`}
                >
                  <MaterialCommunityIcons
                    name="email"
                    size={16}
                    color={
                      errors.email
                        ? "#f87171"
                        : activeInput === "email"
                          ? "#a855f7"
                          : "rgba(168, 85, 247, 0.8)"
                    }
                  />
                  <TextInput
                    ref={emailInputRef}
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
                    className="text-sm text-white flex-1 ml-2"
                    onFocus={() => handleFocus("email")}
                    onBlur={() => setActiveInput(null)}
                    returnKeyType="next"
                    onSubmitEditing={() => phoneInputRef.current?.focus()}
                  />
                </View>

                {/* Phone Input */}
                <View
                  className={`flex-row items-center bg-[#0a0e17] border ${activeInput === "phone" ? "border-purple-400" : errors.phone ? "border-red-500" : "border-purple-500/30"} rounded-xl px-3 py-2 mb-2`}
                >
                  <MaterialCommunityIcons
                    name="phone"
                    size={16}
                    color={
                      errors.phone
                        ? "#f87171"
                        : activeInput === "phone"
                          ? "#a855f7"
                          : "rgba(168, 85, 247, 0.8)"
                    }
                  />
                  <TextInput
                    ref={phoneInputRef}
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
                    className="text-sm text-white flex-1 ml-2"
                    onFocus={() => handleFocus("phone")}
                    onBlur={() => setActiveInput(null)}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                  />
                </View>

                {/* Password Input */}
                <View
                  className={`flex-row items-center bg-[#0a0e17] border ${activeInput === "password" ? "border-purple-400" : errors.password ? "border-red-500" : "border-purple-500/30"} rounded-xl px-3 py-2`}
                >
                  <MaterialCommunityIcons
                    name="lock"
                    size={16}
                    color={
                      errors.password
                        ? "#f87171"
                        : activeInput === "password"
                          ? "#a855f7"
                          : "rgba(168, 85, 247, 0.8)"
                    }
                  />
                  <TextInput
                    ref={passwordInputRef}
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
                    className="text-sm text-white flex-1 ml-2"
                    onFocus={() => handleFocus("password")}
                    onBlur={() => setActiveInput(null)}
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

                {/* Error messages */}
                {Object.values(errors).filter(Boolean).length > 0 && (
                  <View className="bg-red-900/30 rounded-lg p-1.5 mt-2">
                    {Object.entries(errors).map(([key, error]) =>
                      error ? (
                        <Text key={key} className="text-red-300 text-xs mb-0.5">
                          • {error}
                        </Text>
                      ) : null
                    )}
                  </View>
                )}

                {/* Register Button */}
                <TouchableOpacity
                  className="mt-4"
                  onPress={async () => {
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
                      const result = await registerWithEmail(
                        name,
                        username,
                        email,
                        phone,
                        password
                      );
                      if (result.success) {
                        router.replace("/user");
                      }
                    }
                  }}
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
                          JOIN ARENA
                        </Text>
                        <View className="bg-white/30 rounded-full p-0.5">
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

              {/* Social Register */}
              <View className="items-center mt-4">
                <Text className="text-gray-300 mb-2 text-xs font-medium">
                  Quick Register
                </Text>
                <View className="flex-row space-x-4">
                  <TouchableOpacity
                    className="bg-[#1e293b] rounded-full p-3 border border-gray-700/50"
                    onPress={async () => {
                      const result = await loginWithGoogle();
                      if (result.success) {
                        router.replace("/user");
                      }
                    }}
                    disabled={isLoading}
                  >
                    <FontAwesome name="google" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Login Link */}
              <View className="mt-auto mb-3 items-center">
                <View className="flex-row">
                  <Text className="text-gray-300 text-xs">
                    Already a warrior?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => router.replace("/authentication/login")}
                  >
                    <Text className="text-purple-400 text-xs font-bold">
                      Login
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

export default RegisterScreen;
