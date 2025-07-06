import { Stack } from "expo-router";

export default function AdminLayout() {
  // The authentication screens have their own _layout.jsx file
  // This ensures they are rendered without the sidebar
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(main)" />
      <Stack.Screen name="authentication" />
    </Stack>
  );
}
