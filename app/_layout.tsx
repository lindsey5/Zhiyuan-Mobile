import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";

const queryClient = new QueryClient();

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        ADLaMDisplay: require('../assets/fonts/ADLaMDisplay-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{ headerShown: false }} />
        </QueryClientProvider>
    );
}

