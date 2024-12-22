import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }} />
      <Stack.Screen name="about" options={{ title: 'About', headerShown: false }} />
      <Stack.Screen name="register" options={{ title: 'RegisterScreen', headerShown: false }} />
      <Stack.Screen name="login" options={{ title: 'LoginScreen', headerShown: false }} />
    </Stack>
  );
}
