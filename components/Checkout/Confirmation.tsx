import { useCartStore } from "@/lib/store/cartStore";
import { Text, StyleSheet, ScrollView, View, ActivityIndicator } from "react-native";
import { Socket } from "socket.io-client";
import CheckoutItem from "./CheckoutItem";
import COLOR from "@/lib/contants/color";
import Button from "../ui/Button";
import { ClipboardList } from "lucide-react-native";
import { useMemo } from "react";
import { useCreateOrder } from "@/hooks/Order/use-create-order.hook";
import OrderSuccess from "./OrderSuccess";
import { useRouter } from "expo-router";
import { formatToPeso } from "@/utils/format";

interface CheckConfirmationProps {
    order: CreateOrderState | undefined;
    back: () => void;
    currentStep: number;
}

export default function CheckoutConfirmation({ order, back, currentStep }: CheckConfirmationProps) {
    const { cart } = useCartStore();
    const createOrderMutation = useCreateOrder();
    const router = useRouter();

    if (currentStep !== 3) return null;

    const addressLine = useMemo(() => (
        order?.delivery_type === "delivery"
        ? [
            order.address?.street,
            order.address?.barangay,
            order.address?.city,
            order.address?.region,
          ].filter(Boolean).join(", ")
        : null
    ), [order])

    const total = useMemo(() => {
        return cart.reduce((total, item) => total + item.amount, 0)
    }, [cart])

    const isSubmitting = createOrderMutation.isPending; // or isLoading

    const handleSubmit = async () => {
        if (!order) return;

        createOrderMutation.mutate({ 
            data: {
                ...order,
                items: cart
            }
        });
    };

    const redirectToHome = () => {
        router.replace({
            pathname: "/",
            params: { review: "true", name: order?.customer_name }
        })
    }

    if(createOrderMutation.isSuccess) return (
        <OrderSuccess 
            itemCount={createOrderMutation.data.order.order_items.length}
            onBackToHome={redirectToHome}
            order={order}
            orderId={createOrderMutation.data.order.order_id}
            total={createOrderMutation.data.order.total_amount}
        />
    )

    return (
        <>
            <ScrollView style={styles.itemsContainer}>
                <View style={styles.header}>
                    <View style={styles.iconWrapper}>
                        <ClipboardList size={30} color={COLOR.primary} strokeWidth={1.5} />
                    </View>
                    <Text style={styles.headerTitle}>Order Confirmation</Text>
                    <Text style={styles.headerSub}>Review your order before submitting</Text>
                </View>
                <Text style={styles.sectionLabel}>Items</Text>
                {cart.map((item) => (
                    <CheckoutItem key={item.variant_id} item={item} />
                ))}

                <View style={styles.infoCard}>
                    <Text style={styles.infoCardLabel}>Order Details</Text>

                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>Name</Text>
                        <Text style={styles.rowValue}>{order?.customer_name}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>Type</Text>
                        <Text style={styles.rowValue}>For {order?.delivery_type ?? "—"}</Text>
                    </View>

                    {addressLine && (
                        <View style={styles.row}>
                            <Text style={styles.rowLabel}>Address</Text>
                            <Text style={styles.rowValue}>{addressLine}</Text>
                        </View>
                    )}
                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>Shipping Fee</Text>
                        <Text style={[styles.rowValue, { color: COLOR.accent}]}>Free</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>Subtotal</Text>
                        <Text style={styles.rowValue}>{formatToPeso(total)}</Text>
                    </View>
                    <View style={[styles.row, {
                        paddingTop: 8,
                        borderTopWidth: StyleSheet.hairlineWidth,
                        borderTopColor: COLOR.border,
                    }]}>
                        <Text style={[styles.rowLabel, { fontWeight: 'bold' }]}>Total</Text>
                        <Text style={[styles.rowValue, { fontWeight: 'bold' }]}>{formatToPeso(total)}</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button
                    style={[styles.backButton, styles.button]}
                    onPress={back}
                    disabled={isSubmitting}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </Button>

                <Button
                    style={styles.button}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <View style={styles.loadingWrapper}>
                            <ActivityIndicator size="small" color="#fff" />
                            <Text style={styles.buttonText}>Loading...</Text>
                        </View>
                    ) : (
                        <Text style={styles.buttonText}>Place Order</Text>
                    )}
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
        
    header: {
        alignItems: "center",
        marginBottom: 24,
        gap: 4,
    },

    iconWrapper: {
        width: 60,
        height: 60,
        borderRadius: 14,
        backgroundColor: COLOR.panel,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: COLOR.border,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#1a1a1a",
        letterSpacing: 0.2,
    },

    headerSub: {
        color: COLOR.muted,
    },

    sectionLabel: {
        fontWeight: "600",
        letterSpacing: 0.8,
        textTransform: "uppercase",
        color: COLOR.muted,
        marginBottom: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: COLOR.border,
        paddingBottom: 10,
    },

    infoCard: {
        marginTop: 20,
        backgroundColor: COLOR.panel,
        borderRadius: 10,
        padding: 14,
        gap: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: COLOR.border,
    },

    infoCardLabel: {
        fontWeight: "600",
        letterSpacing: 0.8,
        textTransform: "uppercase",
        color: COLOR.muted,
        paddingBottom: 8,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: COLOR.border,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 12,
    },

    rowLabel: {
        fontSize: 14,
        color: COLOR.muted,
        minWidth: 60,
    },

    rowValue: {
        fontSize: 14,
        fontWeight: "500",
        color: "#1a1a1a",
        flex: 1,
        textAlign: "right",
    },

    buttonContainer: {
        width: "100%",
        gap: 10,
        flexDirection: "row",
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
        backgroundColor: COLOR.panel,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: COLOR.border,
    },

    loadingWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
});