import { View, Text, StyleSheet, Dimensions } from "react-native";
import QuantitySelectorButton from "./QuantitySelectorButton";
import { useMemo } from "react";

const { width } = Dimensions.get("window");

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

    const formattedQuantity = useMemo(() => quantity.toString().padStart(2, "0"), [quantity]);

    return (
        <View style={styles.quantityContainer}>
        <QuantitySelectorButton
            onPress={decrementQuantity}
            imageSource={require("../../assets/SubtrButton.png")}
            disabled={quantity <= 1}
        />

        <View style={styles.quantityWrapper}>
            <Text style={styles.quantityText}>{formattedQuantity}</Text>
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
        fontSize: width * 0.12,
        fontWeight: "bold",
        textAlign: "center",
        letterSpacing: 2,
    },
    });
