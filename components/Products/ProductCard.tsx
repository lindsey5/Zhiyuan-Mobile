import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import CustomizedText from "../ui/Text";
import useResponsiveFontSize from "@/hooks/useResponsiveFont";
import { useRouter } from "expo-router";

const { width: screenWidth } = Dimensions.get("window");

const getItemWidth = (numColumns : number, containerPadding = 20, spacing = 10) => {
  return (screenWidth - containerPadding * 2 - spacing * (numColumns - 1)) / numColumns;
};

export default function ProductCard ({ item } : { item: Product  }) {
    const font20 = useResponsiveFontSize(20);
    const router = useRouter();
    let numColumns = 2;

    if (screenWidth > 900) {
        numColumns = 4;
    } else if (screenWidth > 600) {
        numColumns = 3;
    }
    const itemWidth = getItemWidth(numColumns);

    const handleAddToCart = () => {
        router.push(`/product/${item.id}`);
    };

    return (
        <View style={[styles.card, { width: itemWidth }]}>
            <Image
                source={
                    typeof item.image === "string"
                        ? { uri: item.image }
                        : item.image
                }
                style={styles.image}
                resizeMode="contain"
            />

            <CustomizedText style={{ fontSize: font20, marginTop: 20 }}>
                {item.name}
            </CustomizedText>

            <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
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
        boxShadow: "0px 4px 6px rgba(0,0,0,0.3)"
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