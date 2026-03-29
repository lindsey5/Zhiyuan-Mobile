import { Stack, useRouter } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        ADLaMDisplay: require('../assets/fonts/ADLaMDisplay-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    async function setupNavBar() {
      // Hide nav bar
      await NavigationBar.setVisibilityAsync("hidden");

      // Enable swipe to temporarily show it
      await NavigationBar.setBehaviorAsync("overlay-swipe");
    }

    useEffect(() => {
        setupNavBar();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{ headerShown: false }} />
        </QueryClientProvider>
    );
}

