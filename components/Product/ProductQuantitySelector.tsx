import { View, Text, StyleSheet, Dimensions } from "react-native";
import ProductQuantitySelectorButton from "./ProductQuantitySelectorButton";
import { useMemo } from "react";
import useResponsiveFontSize from "@/hooks/useResponsiveFont";

export default function ProductQuantitySelector(
    {
        incrementQuantity,
        decrementQuantity,
        quantity,
        selectedVariant
    }: {
        incrementQuantity: () => void;
        decrementQuantity: () => void;
        quantity: number;
        selectedVariant?: Variant
    }
    ) {
    
    const font60 = useResponsiveFontSize(60);
    const formattedQuantity = useMemo(() => quantity.toString().padStart(2, "0"), [quantity]);

    return (
        <View style={styles.quantityContainer}>
        <ProductQuantitySelectorButton
            onPress={decrementQuantity}
            imageSource={require("../../assets/SubtrButton.png")}
            disabled={quantity <= 1}
        />

        <View style={styles.quantityWrapper}>
            <Text style={[styles.quantityText, { fontSize: font60 }]}>{formattedQuantity}</Text>
        </View>

        <ProductQuantitySelectorButton
            onPress={incrementQuantity}
            imageSource={require("../../assets/AddButton.png")}
            disabled={quantity >= (selectedVariant?.stock || 0)}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    quantityContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        alignSelf: "center",
    },

    quantityWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    quantityText: {
        fontWeight: "bold",
        textAlign: "center",
        letterSpacing: 2,
    },
});
