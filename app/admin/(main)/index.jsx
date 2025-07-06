import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const isWeb = Platform.OS === "web";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Active Matches",
      value: "12",
      icon: "sword-cross",
      color: "bg-blue-500",
      change: "+3 today",
    },
    {
      title: "Total Players",
      value: "1,247",
      icon: "account-group",
      color: "bg-green-500",
      change: "+45 this week",
    },
    {
      title: "Tournament Funds",
      value: "₹2,45,600",
      icon: "wallet",
      color: "bg-purple-500",
      change: "+12% this month",
    },
    {
      title: "Blocked Players",
      value: "8",
      icon: "account-cancel",
      color: "bg-red-500",
      change: "2 this week",
    },
  ];

  const quickActions = [
    {
      title: "Add New Match",
      subtitle: "Create tournament match",
      icon: "plus-circle",
      color: "bg-blue-600",
      action: () => router.push("/admin/matches/add"),
    },
    {
      title: "Manage Funds",
      subtitle: "Player wallet control",
      icon: "cash-multiple",
      color: "bg-green-600",
      action: () => router.push("/admin/player-funds"),
    },
    {
      title: "Block Player",
      subtitle: "Restrict user access",
      icon: "account-remove",
      color: "bg-red-600",
      action: () => router.push("/admin/block-players"),
    },
    {
      title: "View Reports",
      subtitle: "Analytics & insights",
      icon: "chart-line",
      color: "bg-purple-600",
      action: () => router.push("/admin/reports"),
    },
  ];

  const recentActivity = [
    {
      action: "New match created",
      details: "BGMI Squad Championship",
      time: "2 minutes ago",
      icon: "plus",
      color: "text-green-400",
    },
    {
      action: "Player blocked",
      details: "User: shadowkiller123",
      time: "15 minutes ago",
      icon: "block-helper",
      color: "text-red-400",
    },
    {
      action: "Funds transferred",
      details: "₹5,000 to player wallet",
      time: "1 hour ago",
      icon: "cash-fast",
      color: "text-blue-400",
    },
    {
      action: "Match completed",
      details: "Solo Classic Match #4567",
      time: "2 hours ago",
      icon: "check-circle",
      color: "text-purple-400",
    },
  ];

  const StatCard = ({ stat }) => (
    <View className="bg-white/10 rounded-2xl p-4 border border-purple-500/20">
      <View className="flex-row items-center justify-between mb-3">
        <View
          className={`w-12 h-12 rounded-xl ${stat.color} items-center justify-center`}
        >
          <MaterialCommunityIcons name={stat.icon} size={24} color="white" />
        </View>
        <Text className="text-white text-2xl font-bold">{stat.value}</Text>
      </View>
      <Text className="text-white/80 font-medium mb-1">{stat.title}</Text>
      <Text className="text-green-400 text-sm">{stat.change}</Text>
    </View>
  );

  const QuickActionCard = ({ action }) => (
    <TouchableOpacity
      onPress={action.action}
      className="bg-white/5 rounded-2xl p-4 border border-purple-500/10"
    >
      <View
        className={`w-12 h-12 rounded-xl ${action.color} items-center justify-center mb-3`}
      >
        <MaterialCommunityIcons name={action.icon} size={24} color="white" />
      </View>
      <Text className="text-white font-bold text-lg mb-1">{action.title}</Text>
      <Text className="text-white/60 text-sm">{action.subtitle}</Text>
    </TouchableOpacity>
  );

  const ActivityItem = ({ activity }) => (
    <View className="flex-row items-center p-3 bg-white/5 rounded-xl mb-2">
      <View className="w-10 h-10 bg-purple-500/20 rounded-full items-center justify-center mr-3">
        <MaterialCommunityIcons
          name={activity.icon}
          size={20}
          color={activity.color.replace("text-", "")}
        />
      </View>
      <View className="flex-1">
        <Text className="text-white font-medium">{activity.action}</Text>
        <Text className="text-white/60 text-sm">{activity.details}</Text>
      </View>
      <Text className="text-white/40 text-xs">{activity.time}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-slate-950">
      <StatusBar style="light" />

      {/* Background Effects */}
      <View className="absolute w-full h-full">
        <View className="w-80 h-80 rounded-full bg-purple-600/10 absolute -top-20 -right-20 blur-3xl" />
        <View className="w-60 h-60 rounded-full bg-blue-600/10 absolute top-1/2 -left-20 blur-3xl" />
      </View>

      <SafeAreaView className="flex-1">
        {isWeb && width > 768 ? (
          // Desktop Layout
          <View className="flex-1 p-6">
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Header */}
              <View className="mb-8">
                <Text className="text-white text-3xl font-bold mb-2">
                  Admin Dashboard
                </Text>
                <Text className="text-purple-400 text-lg">
                  Tournament Management Control Center
                </Text>
              </View>

              {/* Stats Grid */}
              <View className="grid grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <StatCard key={index} stat={stat} />
                ))}
              </View>

              <View className="flex-row gap-6">
                {/* Quick Actions */}
                <View className="flex-1">
                  <Text className="text-white text-xl font-bold mb-4">
                    Quick Actions
                  </Text>
                  <View className="grid grid-cols-2 gap-4">
                    {quickActions.map((action, index) => (
                      <QuickActionCard key={index} action={action} />
                    ))}
                  </View>
                </View>

                {/* Recent Activity */}
                <View className="w-96">
                  <Text className="text-white text-xl font-bold mb-4">
                    Recent Activity
                  </Text>
                  <View className="bg-white/5 rounded-2xl p-4">
                    {recentActivity.map((activity, index) => (
                      <ActivityItem key={index} activity={activity} />
                    ))}
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        ) : (
          // Mobile Layout
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View className="p-6 pb-4">
              <Text className="text-white text-2xl font-bold mb-2">
                Admin Dashboard
              </Text>
              <Text className="text-purple-400">
                Tournament Management Center
              </Text>
            </View>

            {/* Stats */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-6"
              contentContainerStyle={{ paddingHorizontal: 24 }}
            >
              {stats.map((stat, index) => (
                <View key={index} className="w-48 mr-4">
                  <StatCard stat={stat} />
                </View>
              ))}
            </ScrollView>

            {/* Quick Actions */}
            <View className="px-6 mb-6">
              <Text className="text-white text-xl font-bold mb-4">
                Quick Actions
              </Text>
              <View className="flex-row flex-wrap">
                {quickActions.map((action, index) => (
                  <View key={index} className="w-1/2 p-1">
                    <QuickActionCard action={action} />
                  </View>
                ))}
              </View>
            </View>

            {/* Recent Activity */}
            <View className="px-6 mb-6">
              <Text className="text-white text-xl font-bold mb-4">
                Recent Activity
              </Text>
              <View className="bg-white/5 rounded-2xl p-4">
                {recentActivity.map((activity, index) => (
                  <ActivityItem key={index} activity={activity} />
                ))}
              </View>
            </View>

            {/* Bottom Spacing */}
            <View className="h-20" />
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
};

export default AdminDashboard;
