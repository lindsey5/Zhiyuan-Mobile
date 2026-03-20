import { View, Text, StyleSheet, Dimensions } from "react-native";
import QuantitySelectorButton from "./QuantitySelectorButton";
import { useMemo } from "react";
import useResponsiveFontSize from "@/hooks/useResponsiveFont";

export default function QuantitySelector(
    {
        incrementQuantity,
        decrementQuantity,
        quantity
    }: {
        incrementQuantity: () => void;
        decrementQuantity: () => void;
        quantity: number;
    }
    ) {
    
    const font60 = useResponsiveFontSize(60);
    const formattedQuantity = useMemo(() => quantity.toString().padStart(2, "0"), [quantity]);

    return (
        <View style={styles.quantityContainer}>
        <QuantitySelectorButton
            onPress={decrementQuantity}
            imageSource={require("../../assets/SubtrButton.png")}
            disabled={quantity <= 1}
        />

        <View style={styles.quantityWrapper}>
            <Text style={[styles.quantityText, { fontSize: font60 }]}>{formattedQuantity}</Text>
        </View>

        <QuantitySelectorButton
            onPress={incrementQuantity}
            imageSource={require("../../assets/AddButton.png")}
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
