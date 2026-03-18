import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import CustomizedText from "../ui/Text";
import useResponsiveFontSize from "@/hooks/useResponsiveFont";
import { useRouter } from "expo-router";
import { formatToPeso } from "@/utils/format";
import { getItemWidth } from "@/utils/utils";

const { width: screenWidth } = Dimensions.get("window");

export default function ProductCard ({ item } : { item: Product  }) {
    const font16 = useResponsiveFontSize(16);
    const font20 = useResponsiveFontSize(20);
    const router = useRouter();
    let numColumns = 2;

    if (screenWidth > 900) {
        numColumns = 4;
    } else if (screenWidth > 600) {
        numColumns = 3;
    }
    const itemWidth = getItemWidth(screenWidth, numColumns);

    const handleAddToCart = () => {
        router.push(`/product/${item.id}`);
    };

    return (
        <TouchableOpacity onPress={handleAddToCart} style={[styles.card, { width: itemWidth }]}>
            <Image
                source={{ uri: item.thumbnail_url }}
                style={styles.image}
                resizeMode="cover"
            />

            <CustomizedText style={{ fontSize: font16, marginTop: 10 }}>
                {item.product_name}
            </CustomizedText>
            <CustomizedText style={{ fontSize: font20, fontWeight: 'bold' }}>
                {formatToPeso(item.variants[0].price)}
            </CustomizedText>
        </TouchableOpacity> 
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 25,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        backgroundColor: '#fff'
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