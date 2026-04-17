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
    const font14 = useResponsiveFontSize(14);
    const font16 = useResponsiveFontSize(16);
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
            <Text style={styles.sectionLabel}>Delivery Type:</Text>

            <View style={styles.radioRow}>
                <Radio
                    label="For Pickup"
                    value="pickup"
                    selected={deliveryType}
                    onSelect={setDeliveryType}
                    />
                    <Radio

                    label="For Delivery"
                    onSelect={setDeliveryType}
                    value="delivery"
                    selected={deliveryType}
                />
            </View>
        </View>
        {/* Summary */}
        <View style={styles.section}>
            <View style={styles.summaryRow}>
                <Text style={[styles.summaryKey, { fontSize: font14 }]}>Subtotal</Text>
                <Text style={[styles.summaryVal, { fontSize: font14 }]}>{formatToPeso(total)}</Text>
            </View>
            {deliveryType === "delivery" && <View style={styles.summaryRow}>
                <Text style={[styles.summaryKey, { fontSize: font14 }]}>Shipping</Text>
                <Text style={[styles.summaryVal, styles.freeText, { fontSize: font14 }]}>Free</Text>
            </View>}
            <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={[styles.totalLabel, { fontSize: font16 }]}>Total</Text>
                <Text style={[styles.totalAmount, { fontSize: font16 }]}>{formatToPeso(total)}</Text>
            </View>
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
    },
    section: {
        paddingHorizontal: 20,
        paddingVertical: 18,
        gap: 10,
    },

    sectionLabel: {
        fontWeight: "600",
        letterSpacing: 0.8,
        textTransform: "uppercase",
        color: COLOR.muted,
        marginBottom: 2,
    },

    radioRow: {
        flexDirection: "row",
        padding: 0,
        gap: 5,
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    summaryKey: {
        color: COLOR.muted,
    },
    summaryVal: {
        color: COLOR.muted,
        fontWeight: "500",
    },
    freeText: {
        color: COLOR.secondary,
    },
    totalRow: {
        marginTop: 8,
        paddingTop: 12,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: COLOR.border,
    },
    totalLabel: {
        fontWeight: "700",
        color: "#1A1A18",
    },
    totalAmount: {
        fontWeight: "700",
        color: COLOR.primary,
        letterSpacing: -0.3,
    },

    buttonContainer: {
        width: "100%",
        gap: 10,
        flexDirection: 'row',
        paddingBottom: 20,
    },

    button: {
        flex: 1,
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