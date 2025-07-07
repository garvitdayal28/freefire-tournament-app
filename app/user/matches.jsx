import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMatches } from "../../store/matches/useMatches";

export default function MatchesScreen() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [activeFilter, setActiveFilter] = React.useState("All");
  const [selectedMatch, setSelectedMatch] = React.useState(null);
  const { matches, setMatches } = useMatches();
  const router = useRouter();

  // Get filter parameter from URL if available
  const params = useLocalSearchParams();

  // Set the active filter based on URL parameter when component mounts
  React.useEffect(() => {
    if (
      params.filter &&
      [
        "All",
        "Solo",
        "Duo",
        "Squad",
        "Ongoing",
        "Upcoming",
        "Completed",
      ].includes(params.filter)
    ) {
      setActiveFilter(params.filter);
    }
  }, [params.filter]);

  // Filtered matches based on the active filter
  const filteredMatches = React.useMemo(() => {
    if (activeFilter === "All") return matches;
    if (activeFilter === "Completed")
      return matches.filter((match) => match.status === "Completed");
    if (activeFilter === "Ongoing")
      return matches.filter((match) => match.status === "Ongoing");
    if (activeFilter === "Upcoming")
      return matches.filter((match) => match.status === "Upcoming");
    return matches.filter((match) => match.type === activeFilter);
  }, [matches, activeFilter]);

  const loadMatches = React.useCallback(async () => {
    try {
      setIsLoading(true);
      // Mock data is already loaded from the store
      // In a real app, you would fetch data from an API here
      // await fetchMatchesFromAPI();

      // Simulate a brief loading state for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading matches:", error);
      setIsLoading(false);
    }
  }, []);

  const handleRefresh = React.useCallback(async () => {
    if (!isRefreshing) {
      try {
        setIsRefreshing(true);
        await loadMatches();
      } finally {
        setIsRefreshing(false);
      }
    }
  }, [isRefreshing, loadMatches]);

  React.useEffect(() => {
    loadMatches();
  }, [loadMatches]);

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
                  <MaterialCommunityIcons
                    name="trophy-outline"
                    size={24}
                    color="#d8b4fe"
                  />
                </View>
                <View className="ml-3">
                  <Text className="text-gray-300 text-xs font-medium">
                    Find and join
                  </Text>
                  <Text className="text-white text-xl font-bold">
                    AVAILABLE MATCHES
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <TouchableOpacity
                  className="mr-2 bg-black/30 p-2 rounded-full"
                  onPress={handleRefresh}
                  disabled={isRefreshing}
                >
                  <MaterialCommunityIcons
                    name={isRefreshing ? "loading" : "refresh"}
                    size={24}
                    color="#d8b4fe"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          {/* Filter Tabs */}
          <View className="px-4 mt-4 mb-2">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row"
            >
              {[
                "All",
                "Solo",
                "Duo",
                "Squad",
                "Ongoing",
                "Upcoming",
                "Completed",
              ].map((filter) => {
                let bgClass =
                  activeFilter === filter
                    ? filter === "Completed"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                      : filter === "Ongoing"
                        ? "bg-gradient-to-r from-red-600 to-orange-600"
                        : filter === "Upcoming"
                          ? "bg-gradient-to-r from-green-600 to-lime-600"
                          : "bg-gradient-to-r from-purple-600 to-blue-600"
                    : "bg-[#1e293b]";

                return (
                  <TouchableOpacity
                    key={filter}
                    onPress={() => setActiveFilter(filter)}
                    className={`mr-2 px-4 py-2 rounded-xl ${bgClass}`}
                  >
                    <Text
                      className={`${activeFilter === filter ? "text-white font-bold" : "text-gray-400"}`}
                    >
                      {filter}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Matches List */}
          <View className="px-4 mt-8 mb-20">
            {isLoading ? (
              <LinearGradient
                colors={["#1e293b", "#0f172a"]}
                className="rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 p-6"
              >
                <View className="h-48 items-center justify-center">
                  <ActivityIndicator size="large" color="#8b5cf6" />
                  <Text className="text-gray-400 text-lg mt-4 text-center">
                    Loading matches...
                  </Text>
                </View>
              </LinearGradient>
            ) : filteredMatches.length === 0 ? (
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
                    No matches available
                  </Text>
                </View>
              </LinearGradient>
            ) : (
              filteredMatches.map((match, index) => {
                try {
                  const isCompleted = match.status === "Completed";
                  return (
                    <TouchableOpacity
                      key={match.matchId}
                      className="mb-4"
                      onPress={() =>
                        setSelectedMatch(isCompleted ? match : null)
                      }
                      activeOpacity={0.7}
                    >
                      <LinearGradient
                        colors={
                          isCompleted
                            ? [
                                "rgba(30, 64, 175, 0.2)",
                                "rgba(30, 64, 175, 0.1)",
                              ]
                            : [
                                "rgba(126, 34, 206, 0.1)",
                                "rgba(126, 34, 206, 0.05)",
                              ]
                        }
                        className="rounded-2xl overflow-hidden shadow-2xl border border-purple-500/30 p-4"
                      >
                        <View className="flex-row justify-between items-center">
                          <View>
                            <Text className="text-purple-400 text-lg font-bold">
                              {match.type} Match
                            </Text>
                            <Text className="text-gray-400 text-sm mt-1">
                              Map: {match.map}
                            </Text>
                          </View>
                          <View
                            className={`px-3 py-1 rounded-full ${isCompleted ? "bg-blue-900/50" : "bg-purple-900/50"}`}
                          >
                            <Text
                              className={`text-xs ${isCompleted ? "text-blue-300" : "text-purple-300"}`}
                            >
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
                        <View className="mt-4 pt-4 border-t border-purple-500/20">
                          <View className="flex-row justify-between items-center">
                            <View className="flex-row items-center">
                              <MaterialCommunityIcons
                                name="account-group"
                                size={20}
                                color="#c4b5fd"
                              />
                              <Text className="text-purple-300 ml-2">
                                {match.spotsLeft} spots left
                              </Text>
                            </View>
                            <View className="flex-row items-center">
                              <MaterialCommunityIcons
                                name="clock-outline"
                                size={20}
                                color="#c4b5fd"
                              />
                              <Text className="text-purple-300 ml-2">
                                {match.startTime}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                } catch (error) {
                  console.error("Error rendering match:", error);
                  return null;
                }
              })
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Modal for completed match player ranks */}
      {selectedMatch && (
        <Modal
          visible={!!selectedMatch}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedMatch(null)}
        >
          <View className="flex-1 bg-black/70 justify-center items-center">
            <LinearGradient
              colors={["#1e40af", "#4c1d95"]}
              className="w-80 rounded-2xl p-6 shadow-2xl"
            >
              <Text className="text-white text-lg font-bold mb-2">
                Player Ranks
              </Text>
              <View className="bg-[#1e293b] rounded-xl overflow-hidden mb-4">
                <View className="flex-row bg-[#0f172a] p-2">
                  <Text className="text-gray-400 text-xs font-medium w-12 text-center">
                    Rank
                  </Text>
                  <Text className="text-gray-400 text-xs font-medium flex-1">
                    Player
                  </Text>
                  <Text className="text-gray-400 text-xs font-medium w-16 text-center">
                    Kills
                  </Text>
                  <Text className="text-gray-400 text-xs font-medium w-20 text-right">
                    Prize
                  </Text>
                </View>
                <ScrollView
                  nestedScrollEnabled={true}
                  style={{ maxHeight: 200 }}
                >
                  {selectedMatch.players &&
                    selectedMatch.players.map((player, idx) => (
                      <View
                        key={idx}
                        className={`flex-row p-2 ${idx % 2 === 0 ? "bg-[#1e293b]" : "bg-[#0f172a]"}`}
                      >
                        <View className="w-12 items-center justify-center">
                          <View
                            className={`w-6 h-6 rounded-full items-center justify-center ${player.rank <= 3 ? "bg-amber-500" : "bg-gray-700"}`}
                          >
                            <Text
                              className={`text-xs font-bold ${player.rank <= 3 ? "text-white" : "text-gray-300"}`}
                            >
                              {player.rank}
                            </Text>
                          </View>
                        </View>
                        <Text className="text-white flex-1 self-center">
                          {player.name}
                        </Text>
                        <Text className="text-green-400 w-16 text-center self-center">
                          {player.kills}
                        </Text>
                        <View className="flex-row items-center justify-end w-20">
                          <MaterialCommunityIcons
                            name="bitcoin"
                            size={14}
                            color="#fbbf24"
                          />
                          <Text className="text-amber-400 ml-1">
                            {player.prize}
                          </Text>
                        </View>
                      </View>
                    ))}
                </ScrollView>
              </View>
              <Pressable
                className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-xl items-center"
                onPress={() => setSelectedMatch(null)}
              >
                <Text className="text-white font-bold">Close</Text>
              </Pressable>
            </LinearGradient>
          </View>
        </Modal>
      )}
    </View>
  );
}
