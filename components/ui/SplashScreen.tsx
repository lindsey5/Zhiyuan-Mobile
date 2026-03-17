import { useEffect, useRef } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { Image, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const SplashScreen = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            // Fade In
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),

            // Delay
            Animated.delay(1000),

            // Fade Out
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={{ opacity: fadeAnim }}>
                <Image
                    source={require('../../assets/header-logo.png')}
                    style={{
                        width: width * 0.9,
                        height: width * 0.9,
                        maxWidth: 400,
                        maxHeight: 600,
                    }}
                    resizeMode='contain'
                />
            </Animated.View>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animatedText: {
        fontSize: 32,
        fontFamily: 'ADLaMDisplay',
    },
});