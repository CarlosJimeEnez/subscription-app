import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../global.css";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SafeAreaProvider >
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom'
        }}>
        <Stack.Screen name="(tabs)" />
        {/* <Stack.Screen name="subscription/[id]" options={{ headerShown: true, headerTransparent: true, headerTitle: '', headerTintColor: '#fff' }} /> */}
        <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );

}