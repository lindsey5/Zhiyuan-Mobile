import { Stack, useFocusEffect } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as NavigationBar from 'expo-navigation-bar';
import { useCallback, useEffect } from "react";
import Toast from "react-native-toast-message";
import { Platform } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        ADLaMDisplay: require('../assets/fonts/ADLaMDisplay-Regular.ttf'),
    });

    useFocusEffect(
        useCallback(() => {
        if (Platform.OS !== "android") return;

        NavigationBar.setBehaviorAsync("overlay-swipe");
        NavigationBar.setVisibilityAsync("hidden");

        return () => {
            NavigationBar.setVisibilityAsync("visible");
        };
        }, [])
    );

    if (!fontsLoaded) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{ headerShown: false }} />
            <Toast topOffset={60}/>
        </QueryClientProvider>
    );
}

