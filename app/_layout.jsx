import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./globals.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="authentication/login"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="authentication/register"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="user" options={{ headerShown: false }} />
        <Stack.Screen name="admin" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
