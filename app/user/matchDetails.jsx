import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMatches } from "../../store/matches/useMatches";

export default function MatchDetailsScreen() {
  const { matchId } = useLocalSearchParams();
  const { matches } = useMatches();
  const match = matches.find((m) => m.matchId === matchId);
  const [showJoinModal, setShowJoinModal] = React.useState(false);

  if (!match) {
    return (
      <View className="flex-1 bg-[#0a0e17] items-center justify-center">
        <Text className="text-white">Match not found.</Text>
      </View>
    );
  }

  const isUpcoming = match.status === "Upcoming";
  const isCompleted = match.status === "Completed";

  return (
    <View className="flex-1 bg-[#0a0e17]">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          <LinearGradient
            colors={["#4c1d95", "#1e40af"]}
            start={[0, 0]}
            end={[1, 0]}
            className="px-4 py-4 rounded-b-3xl shadow-xl"
          >
            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => router.back()} className="mr-4">
                <Ionicons name="arrow-back" size={24} color="#d8b4fe" />
              </TouchableOpacity>
              <Text className="text-white text-xl font-bold">
                Match Details
              </Text>
            </View>
          </LinearGradient>

          <View className="px-4 mt-8">
            <Text className="text-white text-2xl font-extrabold mb-2">
              {match.type} Match
            </Text>
            <Text className="text-gray-400 mb-2">Map: {match.map}</Text>
            <Text className="text-gray-400 mb-2">
              Start Time: {match.startTime}
            </Text>
            <Text className="text-gray-400 mb-2">Status: {match.status}</Text>
            <View className="flex-row justify-between mt-4">
              <View className="flex-1">
                <Text className="text-gray-400 text-xs">Prize Pool</Text>
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
                <Text className="text-gray-400 text-xs">Per Kill</Text>
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
                <Text className="text-gray-400 text-xs">Entry Fee</Text>
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
            <View className="flex-row items-center mt-4">
              <MaterialCommunityIcons
                name="account-group"
                size={20}
                color="#c4b5fd"
              />
              <Text className="text-purple-300 ml-2">
                {match.spotsLeft} spots left
              </Text>
            </View>
          </View>

          {/* Consistent card style for completed match player ranks */}
          {isCompleted && match.players && (
            <View className="px-4 mt-8">
              <LinearGradient
                colors={["#1e293b", "#0f172a"]}
                className="rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 p-6"
              >
                <Text className="text-white text-xl font-bold mb-2">
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
                    {match.players.map((player, idx) => (
                      <View
                        key={idx}
                        className={`flex-row p-2 ${
                          idx % 2 === 0 ? "bg-[#1e293b]" : "bg-[#0f172a]"
                        }`}
                      >
                        <View className="w-12 items-center justify-center">
                          <View
                            className={`w-6 h-6 rounded-full items-center justify-center ${
                              player.rank <= 3 ? "bg-amber-500" : "bg-gray-700"
                            }`}
                          >
                            <Text
                              className={`text-xs font-bold ${
                                player.rank <= 3
                                  ? "text-white"
                                  : "text-gray-300"
                              }`}
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
              </LinearGradient>
            </View>
          )}
        </ScrollView>

        {/* Join Button for Upcoming Matches */}
        {isUpcoming && (
          <View className="absolute bottom-0 left-0 right-0 px-4 pb-6">
            <TouchableOpacity
              className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-xl shadow-lg items-center"
              onPress={() => setShowJoinModal(true)}
            >
              <Text className="text-white font-bold">JOIN MATCH</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Custom Modal for Join Confirmation */}
        <Modal
          visible={showJoinModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowJoinModal(false)}
        >
          <View className="flex-1 bg-black/70 justify-center items-center">
            <LinearGradient
              colors={["#4c1d95", "#1e40af"]}
              className="w-80 rounded-2xl p-6 shadow-2xl"
            >
              <Text className="text-white text-lg font-bold mb-2">
                Join {match.type} Match?
              </Text>
              <Text className="text-gray-300 mb-4">
                Entry Fee:{" "}
                <Text className="text-amber-400 font-bold">
                  {match.entryFee}
                </Text>{" "}
                coins
              </Text>
              <View className="flex-row justify-end mt-4">
                <Pressable
                  className="bg-[#1e293b] px-4 py-2 rounded-xl mr-2"
                  onPress={() => setShowJoinModal(false)}
                >
                  <Text className="text-purple-400 font-semibold">Cancel</Text>
                </Pressable>
                <Pressable
                  className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-xl"
                  onPress={() => {
                    setShowJoinModal(false);
                    // TODO: Implement join logic
                  }}
                >
                  <Text className="text-white font-bold">Join</Text>
                </Pressable>
              </View>
            </LinearGradient>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}
