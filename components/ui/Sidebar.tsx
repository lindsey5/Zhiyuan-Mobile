import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { TouchableOpacity, PanResponder, StyleSheet, Text, Image, Animated } from "react-native";
import MenuItem from "./MenuItem";

export default function Sidebar({ setShow } : { setShow: Dispatch<SetStateAction<boolean>>}) {
    const slideAnim = useRef(new Animated.Value(300)).current;
    const threshold = 100;
    
    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start();
    }, []);

    const closeSidebar = () => {
        Animated.timing(slideAnim, {
            toValue: 300,
            duration: 300,
            useNativeDriver: true
        }).start(() => setShow(false));
    };

    const panResponder = useRef(
        PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 5,
        onPanResponderMove: (_, gestureState) => {
            const newX = Math.max(0, gestureState.dx); 
            slideAnim.setValue(newX);
        },
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dx > threshold) {
                closeSidebar();
            } else {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
            }
        },
        })
    ).current;

    return (
        <Animated.View 
            style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
            {...panResponder.panHandlers}
        >                
            <Image 
                source={require("../../assets/sidebar.png")}
                resizeMode="stretch"
                style={styles.wavedImage}
                
            />

            <MenuItem />

            <TouchableOpacity style={styles.close} onPress={closeSidebar}>
                <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

        </Animated.View>
    )
}

const styles = StyleSheet.create({
    sidebar: {
        position: "absolute",
        right: 0,
        height: '100%',
        width: "80%",
        maxWidth: 300,
        zIndex: 1,
        paddingVertical: 20,
        paddingRight: 5,
        overflow: "hidden",
    },
    wavedImage: {
        width: "100%",
        height: "100%",
        borderRadius: 30,
    },
    close: {
        position: "absolute",
        top: 60,
        right: 25,
    },
    closeText: { 
        fontSize: 24, 
        color: 'white', 
        fontWeight: "bold" 
    }
});