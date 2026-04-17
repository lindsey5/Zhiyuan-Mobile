import useResponsiveFontSize from "@/hooks/useResponsiveFont";
import COLOR from "@/lib/contants/color";
import { Pressable, View, StyleSheet, Text } from "react-native";

export default function Radio({
    label,
    value,
    selected,
    onSelect,
}: {
    label: string;
    value: string;
    selected: string;
    onSelect: (v: string) => void;
}) {
    const active = selected === value;
    const font16 = useResponsiveFontSize(16);

    return (
        <Pressable
            onPress={() => onSelect(value)}
            style={[styles.pill, active && styles.pillActive]}
        >
            <View style={[styles.pillDot, active && styles.pillDotActive]} />
            <Text style={[styles.pillLabel, { fontSize: font16 }, active && styles.pillLabelActive]}>
                {label}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#FDFCFA",
    },
 
    scroll: { flex: 1 },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    itemDivider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: COLOR.border,
        opacity: 0.5,
        marginVertical: 4,
    },
 
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: COLOR.border,
        marginHorizontal: 20,
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
 
    pillRow: {
        flexDirection: "row",
        gap: 10,
    },
    pill: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingVertical: 11,
        paddingHorizontal: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.border,
        backgroundColor: "#fff",
    },
    pillActive: {
        borderColor: COLOR.primary,
        backgroundColor: COLOR.panel,
    },
    pillDot: {
        width: 13,
        height: 13,
        borderRadius: 7,
        borderWidth: 1.5,
        borderColor: COLOR.muted,
        backgroundColor: "transparent",
    },
    pillDotActive: {
        borderColor: COLOR.primary,
        backgroundColor: COLOR.primary,
    },
    pillLabel: {
        color: COLOR.muted,
        fontWeight: "500",
    },
    pillLabelActive: {
        color: COLOR.primary,
        fontWeight: "600",
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
 
    actions: {
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 20,
        paddingTop: 4,
        paddingBottom: 28,
    },
    backBtn: {
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.border,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    backBtnText: {
        color: COLOR.muted,
        fontWeight: "600",
    },
    nextBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 10,
        backgroundColor: COLOR.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    nextBtnDisabled: {
        backgroundColor: COLOR.skeleton,
    },
    nextBtnText: {
        color: "#fff",
        fontWeight: "700",
        letterSpacing: 0.3,
    },
    nextBtnTextDisabled: {
        color: "#FDFCFA",
        opacity: 0.6,
    },
});