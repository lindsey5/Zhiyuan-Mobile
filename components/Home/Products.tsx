import { products } from "@/constants/data";
import useResponsiveFontSize from "@/hooks/useResponsiveFont";
import { View, StyleSheet, Image, TouchableOpacity, FlatList, useWindowDimensions } from "react-native";
import CustomizedText from "../ui/Text";

export default function Products() {
    const { width } = useWindowDimensions();

    let numColumns = 2;

    if (width > 900) {
        numColumns = 4;
    } else if (width > 600) {
        numColumns = 3;
    }

    const CARD_WIDTH = width / numColumns - 16;
    const font20 = useResponsiveFontSize(20);

    return (
        <FlatList
            style={{ flex: 1 }}
            key={numColumns}
            data={products}
            numColumns={numColumns}
            keyExtractor={(item) => item.id.toString()}
            columnWrapperStyle={{ gap: 10 }}
            contentContainerStyle={{ padding: 16, gap: 10 }}
            renderItem={({ item }) => (
                <View style={[styles.productContainer, { width: CARD_WIDTH }]}>
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
            )}
        />
    );
}

const styles = StyleSheet.create({
    productContainer: {
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