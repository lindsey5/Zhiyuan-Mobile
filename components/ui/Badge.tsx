import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";

const Badge = ({ count, style } : { count : number, style?: StyleProp<ViewStyle> }) => {
    if (count === 0) return null;

    return (
        <View style={[styles.badge, style]}>
            <Text style={styles.badgeText}>{count}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        position: "absolute",
        top: -15,
        right: -15,
        backgroundColor: "red",
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 4,
    },
    badgeText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
});

export default Badge;