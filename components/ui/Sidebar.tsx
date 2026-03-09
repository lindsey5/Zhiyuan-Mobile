import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { TouchableOpacity, View, StyleSheet, Text, Image, Animated, Pressable } from "react-native";
import MenuItem from "./MenuItem";

export default function Sidebar({ setShow } : { setShow: Dispatch<SetStateAction<boolean>>}) {
    const slideAnim = useRef(new Animated.Value(300)).current;

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

    return (
        <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>                
            <Image 
                source={require("../../assets/sidebar.png")}
                resizeMode="stretch"
                style={{
                    width: "100%",
                    height: "100%"
                }}
                
            />

            <MenuItem />

            <TouchableOpacity style={styles.close} onPress={closeSidebar}>
                <Text style={{ fontSize: 24, color: 'white', fontWeight: "bold" }}>✕</Text>
            </TouchableOpacity>

        </Animated.View>
    )
}

const styles = StyleSheet.create({
    sidebar: {
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: "80%",
        maxWidth: 400,
        zIndex: 1,
        padding: 5,
    },
    close: {
        position: "absolute",
        top: "15%",
        right: 20,
    },
});