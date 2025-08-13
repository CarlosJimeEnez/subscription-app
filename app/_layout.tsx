import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { ThemeProvider } from '@shopify/restyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from '../constants/theme';
import "../global.css";

// Crear una instancia del QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider tokenCache={tokenCache}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: 'fade_from_bottom',
                  contentStyle: { backgroundColor: theme.colors.background }
                }}>
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="subscription/[id]" options={{ headerShown: true, headerTransparent: true, headerTitle: '', headerTintColor: '#fff' }} />
                <Stack.Screen name="expense/[id]" options={{ headerShown: true, headerTransparent: true, headerTitle: '', headerTintColor: '#fff' }} />
                <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
              </Stack>
              <StatusBar style="light" />
            </View>
          </SafeAreaProvider>
        </ThemeProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}