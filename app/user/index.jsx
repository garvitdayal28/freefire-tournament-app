import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMatches } from "../../store/matches/useMatches";
import { useUserAuth } from "../../store/user/auth/useUserAuth";

export default function HomeScreen() {
  const { matches, user: matchUser } = useMatches();
  const { user: authUser, fetchUserData } = useUserAuth();
  // Fetch user data on mount (optional: useEffect)
  // useEffect(() => { fetchUserData(); }, []);

  // Use authUser for display
  const displayName = authUser?.name || authUser?.username || "User";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // Get ongoing matches for My Contests section
  const ongoingMatches = useMemo(() => {
    return matches.filter((match) => match.status === "Ongoing");
  }, [matches]);
  return (
    <View className="flex-1 bg-[#0a0e17]">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <LinearGradient
            colors={["#4c1d95", "#1e40af"]}
            start={[0, 0]}
            end={[1, 0]}
            className="px-4 py-4 rounded-b-3xl shadow-xl"
          >
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <View className="w-12 h-12 rounded-full bg-black/30 items-center justify-center shadow-2xl border-2 border-purple-400">
                  <Text className="text-white font-extrabold text-lg">
                    {initials}
                  </Text>
                </View>
                <View className="ml-3">
                  <Text className="text-gray-300 text-xs font-medium">
                    Welcome back
                  </Text>
                  <Text className="text-white text-xl font-bold">
                    {displayName}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <TouchableOpacity className="mr-4 bg-black/30 p-2 rounded-full">
                  <Ionicons name="notifications" size={24} color="#d8b4fe" />
                </TouchableOpacity>
                <TouchableOpacity className="bg-gradient-to-r from-yellow-500 to-amber-500 px-4 py-2 rounded-xl shadow-2xl">
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons
                      name="bitcoin"
                      size={18}
                      color="black"
                    />
                    <Text className="text-black font-bold text-base ml-1">
                      100
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          {/* Esport Games Section */}
          <View className="px-4 mt-8">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white text-2xl font-extrabold">
                Esport Games
              </Text>
              <TouchableOpacity
                className="bg-[#1e293b] px-3 py-1 rounded-full"
                onPress={() => {
                  router.push("/user/matches");
                }}
              >
                <Text className="text-purple-400 text-xs font-semibold">
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between">
              <TouchableOpacity
                className="w-[48%]"
                onPress={() => {
                  router.push({
                    pathname: "/user/matches",
                    params: { filter: "Solo" },
                  });
                }}
              >
                <LinearGradient
                  colors={[
                    "rgba(126, 34, 206, 0.1)",
                    "rgba(126, 34, 206, 0.05)",
                  ]}
                  className="rounded-2xl overflow-hidden shadow-2xl border border-purple-500/30"
                >
                  <View className="h-36 items-center justify-center relative">
                    <View className="absolute -right-5 -top-5 w-20 h-20 bg-purple-700/20 rounded-full" />
                    <View className="absolute -left-2 -bottom-4 w-16 h-16 bg-purple-500/20 rounded-full" />

                    <Image
                      source={require("../../assets/images/react-logo.png")}
                      className="w-20 h-20"
                      resizeMode="contain"
                    />
                    <View className="absolute bottom-2 left-0 right-0 items-center">
                      <Text className="text-purple-400 text-lg font-bold">
                        SHADOW ARENA
                      </Text>
                    </View>
                  </View>
                  <LinearGradient
                    colors={["#4c1d95", "#2e1065"]}
                    start={[0, 0]}
                    end={[1, 0]}
                    className="py-3 items-center rounded-b-2xl"
                  >
                    <View className="flex-row items-center">
                      <MaterialCommunityIcons
                        name="sword-cross"
                        size={18}
                        color="#c4b5fd"
                      />
                      <Text className="text-white font-medium text-base ml-2">
                        SOLO MATCH
                      </Text>
                    </View>
                  </LinearGradient>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                className="w-[48%]"
                onPress={() => {
                  router.push({
                    pathname: "/user/matches",
                    params: { filter: "Squad" },
                  });
                }}
              >
                <LinearGradient
                  colors={["rgba(30, 64, 175, 0.1)", "rgba(30, 64, 175, 0.05)"]}
                  className="rounded-2xl overflow-hidden shadow-2xl border border-blue-500/30"
                >
                  <View className="h-36 items-center justify-center relative">
                    <View className="absolute -left-5 -top-5 w-20 h-20 bg-blue-700/20 rounded-full" />
                    <View className="absolute -right-2 -bottom-4 w-16 h-16 bg-blue-500/20 rounded-full" />

                    <Image
                      source={require("../../assets/images/react-logo.png")}
                      className="w-20 h-20"
                      resizeMode="contain"
                    />
                    <View className="absolute bottom-2 left-0 right-0 items-center">
                      <Text className="text-blue-400 text-lg font-bold">
                        SOLO MATCH
                      </Text>
                    </View>
                  </View>
                  <LinearGradient
                    colors={["#1e40af", "#1e3a8a"]}
                    start={[0, 0]}
                    end={[1, 0]}
                    className="py-3 items-center rounded-b-2xl"
                  >
                    <View className="flex-row items-center">
                      <MaterialCommunityIcons
                        name="account-group"
                        size={18}
                        color="#93c5fd"
                      />
                      <Text className="text-white font-medium text-base ml-2">
                        SQUAD MATCH
                      </Text>
                    </View>
                  </LinearGradient>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* My Contests Section */}
          <View className="px-4 mt-8 mb-20">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white text-2xl font-extrabold">
                On Going Matches
              </Text>
              <TouchableOpacity className="bg-[#1e293b] px-3 py-1 rounded-full">
                <Text className="text-purple-400 text-xs font-semibold">
                  History
                </Text>
              </TouchableOpacity>
            </View>

            {/* Show ongoing matches or empty state */}
            {ongoingMatches.length > 0 ? (
              <View>
                {ongoingMatches.map((match) => (
                  <TouchableOpacity
                    key={match.matchId}
                    className="mb-4"
                    onPress={() => {
                      router.push({
                        pathname: "/user/matchDetails",
                        params: { matchId: match.matchId },
                      });
                    }}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={[
                        "rgba(220, 38, 38, 0.2)",
                        "rgba(220, 38, 38, 0.1)",
                      ]}
                      className="rounded-2xl overflow-hidden shadow-2xl border border-red-500/30 p-4"
                    >
                      <View className="flex-row justify-between items-center">
                        <View>
                          <Text className="text-red-400 text-lg font-bold">
                            {match.type} Match
                          </Text>
                          <Text className="text-gray-400 text-sm mt-1">
                            Map: {match.map}
                          </Text>
                        </View>
                        <View className="px-3 py-1 rounded-full bg-red-900/50">
                          <Text className="text-xs text-red-300">
                            {match.status}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row justify-between mt-4">
                        <View className="flex-1">
                          <Text className="text-gray-400 text-xs">
                            Prize Pool
                          </Text>
                          <View className="flex-row items-center mt-1">
                            <MaterialCommunityIcons
                              name="bitcoin"
                              size={16}
                              color="#fbbf24"
                            />
                            <Text className="text-amber-400 font-bold ml-1">
                              {match.prizePool}
                            </Text>
                          </View>
                        </View>

                        <View className="flex-1">
                          <Text className="text-gray-400 text-xs">
                            Per Kill
                          </Text>
                          <View className="flex-row items-center mt-1">
                            <MaterialCommunityIcons
                              name="bitcoin"
                              size={16}
                              color="#fbbf24"
                            />
                            <Text className="text-amber-400 font-bold ml-1">
                              {match.prizePerKill}
                            </Text>
                          </View>
                        </View>

                        <View className="flex-1">
                          <Text className="text-gray-400 text-xs">
                            Entry Fee
                          </Text>
                          <View className="flex-row items-center mt-1">
                            <MaterialCommunityIcons
                              name="bitcoin"
                              size={16}
                              color="#fbbf24"
                            />
                            <Text className="text-amber-400 font-bold ml-1">
                              {match.entryFee}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-xl shadow-lg items-center"
                  onPress={() => {
                    router.push("/user/matches");
                  }}
                >
                  <Text className="text-white font-bold">
                    JOIN A TOURNAMENT
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <LinearGradient
                colors={["#1e293b", "#0f172a"]}
                className="rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 p-6"
              >
                <View className="h-48 items-center justify-center">
                  <MaterialCommunityIcons
                    name="trophy-variant-outline"
                    size={56}
                    color="#6b7280"
                  />
                  <Text className="text-gray-400 text-lg mt-4 text-center">
                    No active contests
                  </Text>
                  <TouchableOpacity
                    className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-xl shadow-lg"
                    onPress={() => {
                      router.push("/user/matches");
                    }}
                  >
                    <Text className="text-white font-bold">
                      JOIN A TOURNAMENT
                    </Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
