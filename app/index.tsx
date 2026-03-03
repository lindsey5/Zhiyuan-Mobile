import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import SplashScreen from '@/components/ui/SplashScreen';
import { useRouter } from 'expo-router';

export default function App() {
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        ADLaMDisplay: require('../assets/fonts/ADLaMDisplay-Regular.ttf'),
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("./main");
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return <SplashScreen />

}