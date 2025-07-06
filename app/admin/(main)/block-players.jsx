import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BlockPlayersManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [filter, setFilter] = useState("all"); // all, active, blocked

  const [players, setPlayers] = useState([
    {
      id: 1,
      username: "shadowkiller123",
      email: "shadow@example.com",
      joinDate: "2024-01-15",
      gamesPlayed: 47,
      violations: 0,
      status: "Active",
      lastActive: "2024-07-06",
    },
    {
      id: 2,
      username: "cheater_pro",
      email: "cheater@example.com",
      joinDate: "2024-02-20",
      gamesPlayed: 15,
      violations: 3,
      status: "Blocked",
      lastActive: "2024-07-01",
      blockReason: "Multiple cheating violations",
      blockedDate: "2024-07-02",
    },
    {
      id: 3,
      username: "toxic_player",
      email: "toxic@example.com",
      joinDate: "2024-03-10",
      gamesPlayed: 23,
      violations: 2,
      status: "Blocked",
      lastActive: "2024-06-28",
      blockReason: "Inappropriate behavior",
      blockedDate: "2024-06-30",
    },
    {
      id: 4,
      username: "pro_gamer_99",
      email: "progamer@example.com",
      joinDate: "2024-01-05",
      gamesPlayed: 38,
      violations: 1,
      status: "Active",
      lastActive: "2024-07-06",
    },
  ]);

  const getFilteredPlayers = () => {
    let filtered = players;

    if (filter !== "all") {
      filtered = filtered.filter((player) =>
        filter === "active"
          ? player.status === "Active"
          : player.status === "Blocked"
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (player) =>
          player.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          player.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const handleBlockPlayer = (playerId, reason) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerId
          ? {
              ...player,
              status: "Blocked",
              blockReason: reason,
              blockedDate: new Date().toISOString().split("T")[0],
            }
          : player
      )
    );
  };

  const handleUnblockPlayer = (playerId) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerId
          ? {
              ...player,
              status: "Active",
              blockReason: undefined,
              blockedDate: undefined,
            }
          : player
      )
    );
  };

  const PlayerCard = ({ player }) => (
    <View className="bg-white/10 rounded-2xl p-4 mb-4 border border-purple-500/20">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-1">
          <View className="flex-row items-center">
            <Text className="text-white text-lg font-bold">
              {player.username}
            </Text>
            <View
              className={`ml-2 px-3 py-1 rounded-full ${player.status === "Active" ? "bg-green-500" : "bg-red-500"}`}
            >
              <Text className="text-white text-xs font-medium">
                {player.status}
              </Text>
            </View>
            {player.violations > 0 && (
              <View className="ml-2 px-2 py-1 rounded-full bg-yellow-500">
                <Text className="text-white text-xs font-medium">
                  {player.violations} violations
                </Text>
              </View>
            )}
          </View>
          <Text className="text-purple-400">{player.email}</Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-1">
          <Text className="text-white/60 text-sm">Join Date</Text>
          <Text className="text-white">{player.joinDate}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-white/60 text-sm">Games Played</Text>
          <Text className="text-white">{player.gamesPlayed}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-white/60 text-sm">Last Active</Text>
          <Text className="text-white">{player.lastActive}</Text>
        </View>
      </View>

      {player.status === "Blocked" && player.blockReason && (
        <View className="bg-red-600/20 border border-red-500/30 rounded-xl p-3 mb-3">
          <Text className="text-red-300 text-sm font-medium">
            Block Reason:
          </Text>
          <Text className="text-red-200 text-sm">{player.blockReason}</Text>
          <Text className="text-red-400 text-xs mt-1">
            Blocked on: {player.blockedDate}
          </Text>
        </View>
      )}

      <View className="flex-row space-x-2">
        {player.status === "Active" ? (
          <TouchableOpacity
            onPress={() => {
              setSelectedPlayer(player);
              setShowBlockModal(true);
            }}
            className="flex-1 bg-red-600 rounded-lg py-2 items-center"
          >
            <Text className="text-white font-medium">Block Player</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleUnblockPlayer(player.id)}
            className="flex-1 bg-green-600 rounded-lg py-2 items-center"
          >
            <Text className="text-white font-medium">Unblock Player</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity className="flex-1 bg-blue-600 rounded-lg py-2 items-center">
          <Text className="text-white font-medium">View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-gray-600 rounded-lg py-2 items-center">
          <Text className="text-white font-medium">History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const BlockPlayerModal = ({ visible, onClose, player }) => {
    const [blockReason, setBlockReason] = useState("");
    const [selectedReason, setSelectedReason] = useState("");

    const predefinedReasons = [
      "Cheating/Hacking",
      "Inappropriate behavior",
      "Spam/Harassment",
      "Multiple violations",
      "Fraudulent activity",
      "Other",
    ];

    const handleBlock = () => {
      const reason = selectedReason === "Other" ? blockReason : selectedReason;
      if (!reason) return;

      handleBlockPlayer(player.id, reason);
      setBlockReason("");
      setSelectedReason("");
      onClose();
    };

    if (!player) return null;

    return (
      <Modal visible={visible} transparent animationType="slide">
        <View className="flex-1 bg-black/50 justify-center items-center p-4">
          <View className="bg-slate-900 rounded-2xl p-6 w-full max-w-md">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-white text-xl font-bold">Block Player</Text>
              <TouchableOpacity onPress={onClose}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color="#a855f7"
                />
              </TouchableOpacity>
            </View>

            <View className="mb-4">
              <Text className="text-white mb-2">Player: {player.username}</Text>
              <Text className="text-purple-400">Email: {player.email}</Text>
            </View>

            <View className="mb-4">
              <Text className="text-white mb-2">Reason for blocking:</Text>
              {predefinedReasons.map((reason, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedReason(reason)}
                  className={`flex-row items-center mb-2 p-2 rounded-lg ${selectedReason === reason ? "bg-red-600/30" : "bg-white/5"}`}
                >
                  <View
                    className={`w-5 h-5 rounded-full border-2 mr-3 ${selectedReason === reason ? "bg-red-600 border-red-600" : "border-white/30"}`}
                  />
                  <Text className="text-white">{reason}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {selectedReason === "Other" && (
              <View className="mb-4">
                <Text className="text-white mb-2">Custom reason:</Text>
                <TextInput
                  value={blockReason}
                  onChangeText={setBlockReason}
                  placeholder="Enter custom reason"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  multiline
                  numberOfLines={3}
                  className="bg-white/10 border border-purple-500/30 rounded-xl px-4 py-3 text-white"
                />
              </View>
            )}

            <View className="bg-yellow-600/20 border border-yellow-500/30 rounded-xl p-3 mb-6">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="alert"
                  size={20}
                  color="#eab308"
                />
                <Text className="text-yellow-300 text-sm ml-2 flex-1">
                  This action will immediately restrict the player&apos;s access
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleBlock}
              className="bg-red-600 rounded-xl py-3 items-center"
            >
              <Text className="text-white font-bold text-lg">Block Player</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View className="flex-1 bg-slate-950">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="p-6 border-b border-purple-500/20">
          <Text className="text-white text-2xl font-bold">
            Player Management
          </Text>
          <Text className="text-purple-400">
            Block and manage player access
          </Text>
        </View>

        {/* Stats */}
        <View className="flex-row px-6 py-4">
          <View className="flex-1 bg-white/10 rounded-xl p-4 mr-2">
            <Text className="text-white/60 text-sm">Active Players</Text>
            <Text className="text-green-400 text-2xl font-bold">
              {players.filter((p) => p.status === "Active").length}
            </Text>
          </View>
          <View className="flex-1 bg-white/10 rounded-xl p-4 ml-2">
            <Text className="text-white/60 text-sm">Blocked Players</Text>
            <Text className="text-red-400 text-2xl font-bold">
              {players.filter((p) => p.status === "Blocked").length}
            </Text>
          </View>
        </View>

        {/* Filters */}
        <View className="flex-row px-6 py-2">
          {["all", "active", "blocked"].map((filterOption) => (
            <TouchableOpacity
              key={filterOption}
              onPress={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-xl mr-2 ${filter === filterOption ? "bg-purple-600" : "bg-white/10"}`}
            >
              <Text className="text-white capitalize">{filterOption}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Search */}
        <View className="px-6 py-4">
          <View className="flex-row items-center bg-white/10 border border-purple-500/30 rounded-xl px-4 py-3">
            <MaterialCommunityIcons name="magnify" size={20} color="#a855f7" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search players..."
              placeholderTextColor="rgba(255,255,255,0.5)"
              className="text-white flex-1 ml-3"
            />
          </View>
        </View>

        {/* Players List */}
        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
        >
          {getFilteredPlayers().map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </ScrollView>

        <BlockPlayerModal
          visible={showBlockModal}
          onClose={() => {
            setShowBlockModal(false);
            setSelectedPlayer(null);
          }}
          player={selectedPlayer}
        />
      </SafeAreaView>
    </View>
  );
};

export default BlockPlayersManagement;
