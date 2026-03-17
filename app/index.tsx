import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import SplashScreen from '@/components/ui/SplashScreen';
import { useRouter } from 'expo-router';
import * as NavigationBar from "expo-navigation-bar";
import GradientBackground from '@/components/ui/GradientBackgroud';

export default function App() {
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        ADLaMDisplay: require('../assets/fonts/ADLaMDisplay-Regular.ttf'),
    });

    async function setupNavBar() {
      // Hide nav bar
      await NavigationBar.setVisibilityAsync("hidden");

      // Enable swipe to temporarily show it
      await NavigationBar.setBehaviorAsync("overlay-swipe");
    }

    useEffect(() => {
        setupNavBar();

        const timer = setTimeout(() => {
            router.replace("./main");
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SplashScreen />
    )

}