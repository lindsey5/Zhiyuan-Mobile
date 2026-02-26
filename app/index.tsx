import { useFonts } from 'expo-font';
import SplashScreen from '@/components/SplashScreen';

export default function App() {
    const [fontsLoaded] = useFonts({
        ADLaMDisplay: require('../assets/fonts/ADLaMDisplay-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return <SplashScreen />

}