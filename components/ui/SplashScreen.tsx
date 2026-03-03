import { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import CustomizedText from './Text';

const { width } = Dimensions.get('window');

const SplashScreen = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
            }).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box, { opacity: fadeAnim }]}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={{
                        width: width * 0.5,   
                        height: width * 0.7,
                    }}
                />
                <CustomizedText 
                    style={{
                        position: 'absolute', 
                        left: '70%',
                        bottom: '35%',
                    }}>Zhiyuan</CustomizedText>
            </Animated.View>
            <Animated.Text
                style={{ ...styles.animatedText, opacity: fadeAnim }}
            >
                ENTERPRISE{'\n'}GROUP INC.
            </Animated.Text>
        </View>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    box: {
        width: width * 0.5,
        position: 'relative',
    },
    animatedText: {
        fontSize: 32,
        fontFamily: 'ADLaMDisplay',
    },
});