import { useCartStore } from "@/lib/store/cartStore";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import CheckoutItem from "./CheckoutItem";
import Button from "../ui/Button";
import { useRouter } from "expo-router";
import Radio from "../ui/Radio";
import COLOR from "@/lib/contants/color";
import { useMemo } from "react";
import { formatToPeso } from "@/utils/format";
import useResponsiveFontSize from "@/hooks/useResponsiveFont";

interface CheckoutSummaryProps {
    next: () => void;
    deliveryType: string;
    setDeliveryType: (value: string) => void;
    currentStep: number;
}

export default function CheckoutSummary({
    next,
    deliveryType,
    setDeliveryType,
    currentStep
}: CheckoutSummaryProps) {
    const { cart } = useCartStore();
    const font18 = useResponsiveFontSize(18);
    const router = useRouter();

    const total = useMemo(() => {
        if(!cart.length) return 0;
    
        return cart.reduce((total, item) => item.total_amount + total, 0);
    }, [cart])

    const disabled = useMemo(() => !deliveryType, [deliveryType])

    if(currentStep !== 1) return null

    return (
        <>
        <ScrollView style={styles.itemsContainer}>
            {cart.map((item) => (
            <CheckoutItem key={item.variant_id} item={item} />
            ))}
        </ScrollView>
        <View style={styles.deliveryContainer}>
            <Text style={styles.deliveryLabel}>Delivery Type:</Text>

            <View style={styles.radioRow}>
                <Radio
                    containerStyle={styles.radioItem}
                    label="For Pickup"
                    setSelected={setDeliveryType}
                    value="pickup"
                    selected={deliveryType}
                    />
                    <Radio
                    containerStyle={styles.radioItem}
                    label="For Delivery"
                    setSelected={setDeliveryType}
                    value="delivery"
                    selected={deliveryType}
                />
            </View>
        </View>
        <View style={{ marginBottom: 20, gap: 3, alignItems: 'flex-end', width: '100%' }}>
            <Text style={{ fontSize: font18 }}>Subtotal: {formatToPeso(total)}</Text>
            {deliveryType === 'delivery' && <Text style={{ fontSize: font18 }}>Shipping Fee: Free</Text>}
            <Text style={[{ fontSize: font18 }, { fontWeight: 'bold', marginTop: 10 }]}>Total: {formatToPeso(total)}</Text>
        </View>
        <View style={styles.buttonContainer}>
            <Button
                style={[styles.backButton, styles.button]}
                onPress={() => router.back()}
            >
                <Text style={styles.buttonText}>Back to Cart</Text>
            </Button>

            <Button style={[styles.button, disabled && { opacity: 0.4 }]} onPress={next} disabled={disabled}>
                <Text style={styles.buttonText}>Next</Text>
            </Button>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    itemsContainer: {
        marginVertical: 20,
        paddingHorizontal: 10,
        flex: 1,
    },

    deliveryContainer: {
        width: "100%",
        gap: 10,
        paddingHorizontal: 10,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLOR.border,
        marginBottom: 20,
    },

    deliveryLabel: {
        fontSize: 18,
        fontWeight: "bold",
    },

    radioRow: {
        flexDirection: "row",
        padding: 0,
    },

    radioItem: {
        flex: 1,
    },

    buttonContainer: {
        width: "100%",
        gap: 10,
        justifyContent: "flex-end",
        paddingHorizontal: 10,
        paddingBottom: 20,
    },

    button: {
        width: "100%",
    },

    buttonText: {
        textAlign: "center",
        fontWeight: "bold",
    },

    backButton: {
        backgroundColor: "#e0e0e0",
        borderWidth: 1,
        borderColor: "#bdbdbd",
    },
});