import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CheckCircle2 } from "lucide-react-native";
import COLOR from "@/lib/contants/color";

interface OrderSuccessProps {
    order: CreateOrderState | undefined;
    orderId: string;
    itemCount: number;
    total: number;
    onBackToHome: () => void;
}

export default function OrderSuccess({ order, orderId, itemCount, total, onBackToHome }: OrderSuccessProps) {
    return (
        <View style={styles.container}>

            <View style={styles.heroSection}>
                <View style={styles.iconWrapper}>
                    <CheckCircle2 size={28} color="white" strokeWidth={1.8} />
                </View>
                <Text style={styles.title}>Order placed!</Text>
                <Text style={styles.subtitle}>
                    Your order has been successfully placed
                </Text>
                <View style={styles.orderIdBadge}>
                    <Text style={styles.orderIdText}>#{orderId}</Text>
                </View>
            </View>

            <View style={styles.summaryCard}>
                <Text style={styles.sectionLabel}>Order Summary</Text>

                <View style={styles.row}>
                    <Text style={styles.rowLabel}>Customer</Text>
                    <Text style={styles.rowValue}>{order?.customer_name}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.rowLabel}>Type</Text>
                    <Text style={styles.rowValue}>{order?.delivery_type}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.rowLabel}>Items</Text>
                    <Text style={styles.rowValue}>{itemCount}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.row}>
                    <Text style={styles.rowLabel}>Total</Text>
                    <Text style={styles.totalValue}>₱ {total.toFixed(2)}</Text>
                </View>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.secondaryButton} onPress={onBackToHome} activeOpacity={0.85}>
                    <Text style={styles.secondaryButtonText}>Back to Home</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 32,
        gap: 24,
        justifyContent: "center",
    },

    heroSection: {
        alignItems: "center",
        gap: 6,
    },

    iconWrapper: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: COLOR.accent,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },

    title: {
        fontSize: 20,
        fontWeight: "600",
        color: "#1a1a1a",
    },

    subtitle: {
        fontSize: 14,
        color: COLOR.muted,
        textAlign: "center",
        lineHeight: 20,
        maxWidth: 260,
    },

    orderIdBadge: {
        marginTop: 8,
        backgroundColor: COLOR.accent,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 6,
    },

    orderIdText: {
        fontSize: 12,
        fontWeight: "600",
        color: "white",
        letterSpacing: 0.5,
    },

    summaryCard: {
        backgroundColor: COLOR.panel,
        borderRadius: 12,
        padding: 16,
        gap: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: COLOR.border,
    },

    sectionLabel: {
        fontSize: 11,
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
        alignItems: "center",
    },

    rowLabel: {
        fontSize: 13,
        color: COLOR.muted,
    },

    rowValue: {
        fontSize: 13,
        fontWeight: "500",
        color: "#1a1a1a",
    },

    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: COLOR.border,
    },

    totalValue: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1a1a1a",
    },

    actions: {
        gap: 10,
    },

    primaryButton: {
        height: 48,
        backgroundColor: COLOR.primary,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },

    primaryButtonText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#fff",
    },

    secondaryButton: {
        height: 48,
        borderRadius: 12,
        backgroundColor: COLOR.accent,
        alignItems: "center",
        justifyContent: "center",
    },

    secondaryButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: "white",
    },
});