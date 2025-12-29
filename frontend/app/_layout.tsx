import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query'; // Import React Query components
import { useColorScheme, View } from 'react-native';
import { fetchPodcastEpisodes } from '@/api/rss'; // Import the podcast fetch function
import { fetchPeopleGroups } from '@/api/joshuaProject'; // Import people groups fetch function
import "../global.css";
import { setAudioModeAsync } from 'expo-audio';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a new QueryClient instance
const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}> {/* Reintroduced QueryClientProvider */}
      <RootLayoutNav />
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const queryClient = useQueryClient();

  // Prefetch podcast episodes when app starts
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['podcast-episodes'],
      queryFn: fetchPodcastEpisodes,
      staleTime: 1000 * 60 * 60 * 12, // Consider data fresh for 12 hours
    });
  }, [queryClient]);

  // Prefetch unreached people groups in background
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['unreachedPeopleGroups'],
      queryFn: fetchPeopleGroups,
      staleTime: 1000 * 60 * 60, // 1 hour
    });
  }, [queryClient]);

   // 🔊 Ensure audio plays even when phone is on silent/vibrate
  useEffect(() => {
    (async () => {
      await setAudioModeAsync({
        playsInSilentMode: true,
        interruptionMode: 'doNotMix',
      });
    })();
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View className={colorScheme === 'dark' ? 'dark' : ''} style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </View>
    </ThemeProvider>
  );
}
