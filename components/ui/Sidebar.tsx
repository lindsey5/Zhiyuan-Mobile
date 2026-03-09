import responsiveFontSize from "@/hooks/useResponsiveFont";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { TouchableOpacity, View, StyleSheet, Text, Image, Animated, Pressable } from "react-native";

export default function Sidebar({ setShow } : { setShow: Dispatch<SetStateAction<boolean>>}) {
    const slideAnim = useRef(new Animated.Value(300)).current;
    const closeButtonFontSize = responsiveFontSize(24);

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
        <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>                
            <Image 
                source={require("../../assets/sidebar.png")}
                resizeMode="stretch"
                style={{
                    width: "100%",
                    height: "100%"
                }}
                
            />

            <View style={styles.menu}>
                <Pressable>
                    <Text style={styles.item}>Home</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.item}>Products</Text>
                </Pressable>
            </View>

            <TouchableOpacity style={styles.close} onPress={closeSidebar}>
                <Text style={{ fontSize: closeButtonFontSize, color: 'white', fontWeight: "bold" }}>✕</Text>
            </TouchableOpacity>

        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: "80%",
        maxWidth: 400,
        zIndex: 1,
        padding: 5,
    },

    menu: {
        position: "absolute",
        top: "20%",
        right: 50,
    },

    item: {
        marginVertical: 10,
        fontWeight: "bold",
        fontSize: 16,
    },

    close: {
        position: "absolute",
        top: "15%",
        right: 20,
    },
});