import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import CustomizedText from "../ui/Text";
import useResponsiveFontSize from "@/hooks/useResponsiveFont";
import { useRouter } from "expo-router";
import { formatToPeso } from "@/utils/format";

export default function ProductCard ({ item } : { item: Product  }) {
    const font16 = useResponsiveFontSize(16);
    const font20 = useResponsiveFontSize(20);
    const router = useRouter();

    const handleAddToCart = () => {
        router.push(`/product/${item._id}`);
    };

    return (
        <TouchableOpacity onPress={handleAddToCart} style={styles.card}>
            <Image
                source={{ uri: item.thumbnail_url }}
                style={styles.image}
                resizeMode="cover"
            />

            <CustomizedText style={{ fontSize: font16, marginTop: 10 }}>
                {item.product_name}
            </CustomizedText>
            <CustomizedText style={{ fontSize: font20, fontWeight: 'bold' }}>
                {formatToPeso(Math.min(...item.variants?.map(variant => variant.price) || []))}
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