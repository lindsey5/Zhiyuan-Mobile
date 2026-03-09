import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import SplashScreen from '@/components/ui/SplashScreen';
import { useRouter } from 'expo-router';
import * as NavigationBar from "expo-navigation-bar";

export default function App() {
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        ADLaMDisplay: require('../assets/fonts/ADLaMDisplay-Regular.ttf'),
    });

    useEffect(() => {
        NavigationBar.setBehaviorAsync("overlay-swipe");
        NavigationBar.setVisibilityAsync("hidden");

        const timer = setTimeout(() => {
            router.replace("./main");
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return <SplashScreen />

}