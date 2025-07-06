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

const PlayerFundsManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const [players, setPlayers] = useState([
    {
      id: 1,
      username: "shadowkiller123",
      email: "shadow@example.com",
      walletBalance: 2450,
      totalEarnings: 15600,
      gamesPlayed: 47,
      status: "Active",
    },
    {
      id: 2,
      username: "pro_gamer_99",
      email: "progamer@example.com",
      walletBalance: 1890,
      totalEarnings: 12300,
      gamesPlayed: 38,
      status: "Active",
    },
    {
      id: 3,
      username: "sniper_elite",
      email: "sniper@example.com",
      walletBalance: 560,
      totalEarnings: 8900,
      gamesPlayed: 29,
      status: "Blocked",
    },
  ]);

  const PlayerCard = ({ player }) => (
    <View className="bg-white/10 rounded-2xl p-4 mb-4 border border-purple-500/20">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-1">
          <View className="flex-row items-center">
            <Text className="text-white text-lg font-bold">
              {player.username}
            </Text>
            <View
              className={`ml-2 px-2 py-1 rounded-full ${player.status === "Active" ? "bg-green-500" : "bg-red-500"}`}
            >
              <Text className="text-white text-xs">{player.status}</Text>
            </View>
          </View>
          <Text className="text-purple-400">{player.email}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setSelectedPlayer(player);
            setShowAddFundsModal(true);
          }}
          className="bg-purple-600 rounded-full p-2"
        >
          <MaterialCommunityIcons name="cash-plus" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <Text className="text-white/60 text-sm">Wallet Balance</Text>
          <Text className="text-green-400 text-xl font-bold">
            ₹{player.walletBalance}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-white/60 text-sm">Total Earnings</Text>
          <Text className="text-white text-lg font-semibold">
            ₹{player.totalEarnings}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-white/60 text-sm">Games Played</Text>
          <Text className="text-white text-lg font-semibold">
            {player.gamesPlayed}
          </Text>
        </View>
      </View>

      <View className="flex-row mt-4 space-x-2">
        <TouchableOpacity className="flex-1 bg-blue-600 rounded-lg py-2 items-center">
          <Text className="text-white font-medium">Add Funds</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-red-600 rounded-lg py-2 items-center">
          <Text className="text-white font-medium">Deduct Funds</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-gray-600 rounded-lg py-2 items-center">
          <Text className="text-white font-medium">History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const AddFundsModal = ({ visible, onClose, player }) => {
    const [amount, setAmount] = useState("");
    const [reason, setReason] = useState("");
    const [transactionType, setTransactionType] = useState("add");

    const handleTransaction = () => {
      if (!amount || !reason) return;

      const transactionAmount = parseFloat(amount);
      setPlayers((prevPlayers) =>
        prevPlayers.map((p) =>
          p.id === player.id
            ? {
                ...p,
                walletBalance:
                  transactionType === "add"
                    ? p.walletBalance + transactionAmount
                    : p.walletBalance - transactionAmount,
              }
            : p
        )
      );

      setAmount("");
      setReason("");
      onClose();
    };

    if (!player) return null;

    return (
      <Modal visible={visible} transparent animationType="slide">
        <View className="flex-1 bg-black/50 justify-center items-center p-4">
          <View className="bg-slate-900 rounded-2xl p-6 w-full max-w-md">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-white text-xl font-bold">Manage Funds</Text>
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
              <Text className="text-purple-400">
                Current Balance: ₹{player.walletBalance}
              </Text>
            </View>

            <View className="flex-row mb-4">
              <TouchableOpacity
                onPress={() => setTransactionType("add")}
                className={`flex-1 py-2 rounded-lg mr-2 ${transactionType === "add" ? "bg-green-600" : "bg-gray-600"}`}
              >
                <Text className="text-white text-center font-medium">
                  Add Funds
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setTransactionType("deduct")}
                className={`flex-1 py-2 rounded-lg ml-2 ${transactionType === "deduct" ? "bg-red-600" : "bg-gray-600"}`}
              >
                <Text className="text-white text-center font-medium">
                  Deduct Funds
                </Text>
              </TouchableOpacity>
            </View>

            <View className="mb-4">
              <Text className="text-white mb-2">Amount (₹)</Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="Enter amount"
                placeholderTextColor="rgba(255,255,255,0.5)"
                keyboardType="numeric"
                className="bg-white/10 border border-purple-500/30 rounded-xl px-4 py-3 text-white"
              />
            </View>

            <View className="mb-6">
              <Text className="text-white mb-2">Reason</Text>
              <TextInput
                value={reason}
                onChangeText={setReason}
                placeholder="Enter reason for transaction"
                placeholderTextColor="rgba(255,255,255,0.5)"
                multiline
                numberOfLines={3}
                className="bg-white/10 border border-purple-500/30 rounded-xl px-4 py-3 text-white"
              />
            </View>

            <TouchableOpacity
              onPress={handleTransaction}
              className={`rounded-xl py-3 items-center ${transactionType === "add" ? "bg-green-600" : "bg-red-600"}`}
            >
              <Text className="text-white font-bold text-lg">
                {transactionType === "add" ? "Add Funds" : "Deduct Funds"}
              </Text>
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
          <Text className="text-white text-2xl font-bold">Player Funds</Text>
          <Text className="text-purple-400">Manage player wallet balances</Text>
        </View>

        {/* Stats */}
        <View className="flex-row px-6 py-4">
          <View className="flex-1 bg-white/10 rounded-xl p-4 mr-2">
            <Text className="text-white/60 text-sm">Total Players</Text>
            <Text className="text-white text-2xl font-bold">
              {players.length}
            </Text>
          </View>
          <View className="flex-1 bg-white/10 rounded-xl p-4 ml-2">
            <Text className="text-white/60 text-sm">Total Funds</Text>
            <Text className="text-green-400 text-2xl font-bold">
              ₹{players.reduce((sum, player) => sum + player.walletBalance, 0)}
            </Text>
          </View>
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
          {players
            .filter(
              (player) =>
                player.username
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                player.email.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
        </ScrollView>

        <AddFundsModal
          visible={showAddFundsModal}
          onClose={() => {
            setShowAddFundsModal(false);
            setSelectedPlayer(null);
          }}
          player={selectedPlayer}
        />
      </SafeAreaView>
    </View>
  );
};

export default PlayerFundsManagement;
