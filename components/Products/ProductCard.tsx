import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import CustomizedText from "../ui/Text";
import useResponsiveFontSize from "@/hooks/useResponsiveFont";

const { width: screenWidth } = Dimensions.get("window");

const getItemWidth = (numColumns : number, containerPadding = 20, spacing = 10) => {
  return (screenWidth - containerPadding * 2 - spacing * (numColumns - 1)) / numColumns;
};

export default function ProductCard ({ item } : { item: Product  }) {
    const font20 = useResponsiveFontSize(20);
    let numColumns = 2;

    if (screenWidth > 900) {
        numColumns = 4;
    } else if (screenWidth > 600) {
        numColumns = 3;
    }
    const itemWidth = getItemWidth(numColumns);

    return (
        <View style={[styles.card, { width: itemWidth }]}>
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