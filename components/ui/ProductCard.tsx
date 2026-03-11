import { View, Image, StyleSheet, TouchableOpacity, ViewStyle } from "react-native"
import CustomizedText from "./Text";
import useResponsiveFontSize from "@/hooks/useResponsiveFont";

export default function ProductCard ({ item, style } : { item: Product, style?: ViewStyle  }) {
    const font20 = useResponsiveFontSize(20);

    return (
        <View style={[styles.card, style]}>
            <Image
                source={
                    typeof item.image === "string"
                        ? { uri: item.image }
                        : item.image
                }
                style={styles.image}
            />

            <CustomizedText style={{ fontSize: font20, marginTop: 20 }}>
                {item.name}
            </CustomizedText>

            <TouchableOpacity style={styles.button}>
                <CustomizedText style={[styles.buttonText, { fontSize: font20 }]}>
                    Add to Cart
                </CustomizedText>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 25,
        padding: 20,
        backgroundColor: "#fff",
        alignItems: "center",
        elevation: 4,
        shadowColor: "#000", 
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 }
    },
    image: {
        width: "100%",
        height: 120,
        borderRadius: 12,
        resizeMode: "contain"
    },
    button: {
        marginTop: 20,
        backgroundColor: "#000",
        width: "100%",
        padding: 10,
        alignItems: "center",
        borderRadius: 50,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "500"
    }
});