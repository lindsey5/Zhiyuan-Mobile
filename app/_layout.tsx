import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from "react";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        ADLaMDisplay: require('../assets/fonts/ADLaMDisplay-Regular.ttf'),
    });

    useEffect(() => {
        (async () => {
            try {
            await NavigationBar.setBehaviorAsync("overlay-swipe");
            await NavigationBar.setVisibilityAsync("hidden");
            } catch (err) {
            console.log("Navbar error:", err);
            }
        })();
    }, []);

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

