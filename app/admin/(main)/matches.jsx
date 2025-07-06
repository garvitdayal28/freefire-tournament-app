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

const MatchesManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const [matches, setMatches] = useState([
    {
      id: 1,
      title: "BGMI Squad Championship",
      type: "Squad",
      entryFee: 50,
      prizePool: 2000,
      maxPlayers: 100,
      currentPlayers: 67,
      status: "Live",
      startTime: "2024-07-06 18:00",
    },
    {
      id: 2,
      title: "Solo Classic Battle",
      type: "Solo",
      entryFee: 25,
      prizePool: 1000,
      maxPlayers: 50,
      currentPlayers: 43,
      status: "Upcoming",
      startTime: "2024-07-06 20:00",
    },
    {
      id: 3,
      title: "Duo Clash Arena",
      type: "Duo",
      entryFee: 75,
      prizePool: 3000,
      maxPlayers: 80,
      currentPlayers: 80,
      status: "Full",
      startTime: "2024-07-06 19:30",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Live":
        return "bg-green-500";
      case "Upcoming":
        return "bg-blue-500";
      case "Full":
        return "bg-yellow-500";
      case "Completed":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const MatchCard = ({ match }) => (
    <View className="bg-white/10 rounded-2xl p-4 mb-4 border border-purple-500/20">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-1">
          <Text className="text-white text-lg font-bold mb-1">
            {match.title}
          </Text>
          <Text className="text-purple-400">
            {match.type} • {match.currentPlayers}/{match.maxPlayers} players
          </Text>
        </View>
        <View
          className={`px-3 py-1 rounded-full ${getStatusColor(match.status)}`}
        >
          <Text className="text-white text-sm font-medium">{match.status}</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="cash" size={20} color="#a855f7" />
          <Text className="text-white ml-2">Entry: ₹{match.entryFee}</Text>
        </View>
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="trophy" size={20} color="#eab308" />
          <Text className="text-white ml-2">Prize: ₹{match.prizePool}</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="text-white/60">{match.startTime}</Text>
        <View className="flex-row space-x-2">
          <TouchableOpacity
            onPress={() => {
              // Edit functionality to be implemented
            }}
            className="bg-blue-600 px-4 py-2 rounded-lg"
          >
            <MaterialCommunityIcons name="pencil" size={16} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeleteMatch(match.id)}
            className="bg-red-600 px-4 py-2 rounded-lg"
          >
            <MaterialCommunityIcons name="delete" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const handleDeleteMatch = (matchId) => {
    setMatches(matches.filter((match) => match.id !== matchId));
  };

  const AddMatchModal = ({ visible, onClose }) => {
    const [newMatch, setNewMatch] = useState({
      title: "",
      type: "Solo",
      entryFee: "",
      prizePool: "",
      maxPlayers: "",
      startTime: "",
    });

    const handleAddMatch = () => {
      const match = {
        id: Date.now(),
        ...newMatch,
        entryFee: parseInt(newMatch.entryFee),
        prizePool: parseInt(newMatch.prizePool),
        maxPlayers: parseInt(newMatch.maxPlayers),
        currentPlayers: 0,
        status: "Upcoming",
      };
      setMatches([...matches, match]);
      setNewMatch({
        title: "",
        type: "Solo",
        entryFee: "",
        prizePool: "",
        maxPlayers: "",
        startTime: "",
      });
      onClose();
    };

    return (
      <Modal visible={visible} transparent animationType="slide">
        <View className="flex-1 bg-black/50 justify-center items-center p-4">
          <View className="bg-slate-900 rounded-2xl p-6 w-full max-w-md">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-white text-xl font-bold">
                Add New Match
              </Text>
              <TouchableOpacity onPress={onClose}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color="#a855f7"
                />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="mb-4">
                <Text className="text-white mb-2">Match Title</Text>
                <TextInput
                  value={newMatch.title}
                  onChangeText={(text) =>
                    setNewMatch({ ...newMatch, title: text })
                  }
                  placeholder="Enter match title"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  className="bg-white/10 border border-purple-500/30 rounded-xl px-4 py-3 text-white"
                />
              </View>

              <View className="mb-4">
                <Text className="text-white mb-2">Entry Fee (₹)</Text>
                <TextInput
                  value={newMatch.entryFee}
                  onChangeText={(text) =>
                    setNewMatch({ ...newMatch, entryFee: text })
                  }
                  placeholder="0"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  keyboardType="numeric"
                  className="bg-white/10 border border-purple-500/30 rounded-xl px-4 py-3 text-white"
                />
              </View>

              <View className="mb-4">
                <Text className="text-white mb-2">Prize Pool (₹)</Text>
                <TextInput
                  value={newMatch.prizePool}
                  onChangeText={(text) =>
                    setNewMatch({ ...newMatch, prizePool: text })
                  }
                  placeholder="0"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  keyboardType="numeric"
                  className="bg-white/10 border border-purple-500/30 rounded-xl px-4 py-3 text-white"
                />
              </View>

              <View className="mb-6">
                <Text className="text-white mb-2">Max Players</Text>
                <TextInput
                  value={newMatch.maxPlayers}
                  onChangeText={(text) =>
                    setNewMatch({ ...newMatch, maxPlayers: text })
                  }
                  placeholder="0"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  keyboardType="numeric"
                  className="bg-white/10 border border-purple-500/30 rounded-xl px-4 py-3 text-white"
                />
              </View>

              <TouchableOpacity
                onPress={handleAddMatch}
                className="bg-purple-600 rounded-xl py-3 items-center"
              >
                <Text className="text-white font-bold text-lg">Add Match</Text>
              </TouchableOpacity>
            </ScrollView>
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
        <View className="flex-row items-center justify-between p-6 border-b border-purple-500/20">
          <View>
            <Text className="text-white text-2xl font-bold">
              Match Management
            </Text>
            <Text className="text-purple-400">
              Create and manage tournaments
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowAddModal(true)}
            className="bg-purple-600 rounded-xl px-4 py-2"
          >
            <MaterialCommunityIcons name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View className="px-6 py-4">
          <View className="flex-row items-center bg-white/10 border border-purple-500/30 rounded-xl px-4 py-3">
            <MaterialCommunityIcons name="magnify" size={20} color="#a855f7" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search matches..."
              placeholderTextColor="rgba(255,255,255,0.5)"
              className="text-white flex-1 ml-3"
            />
          </View>
        </View>

        {/* Matches List */}
        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
        >
          {matches
            .filter((match) =>
              match.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
        </ScrollView>

        <AddMatchModal
          visible={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      </SafeAreaView>
    </View>
  );
};

export default MatchesManagement;
