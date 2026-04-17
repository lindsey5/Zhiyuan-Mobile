import useResponsiveFontSize from "@/hooks/useResponsiveFont";
import COLOR from "@/lib/contants/color";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type ChipProps = {
  label: string;
  variant?: "primary" | "secondary" | "accent" | "highlight";
};

export default function Chip({ label, variant = "primary" }: ChipProps) {
    const getBgColor = () => {
        switch (variant) {
            case "secondary":
                return COLOR.secondary;
            case "accent":
                return COLOR.accent;
            case "highlight":
                return COLOR.highlight;
            default:
                return COLOR.primary;
        }
    };

    const font14 = useResponsiveFontSize(14);

    return (
        <View style={[styles.chip, { backgroundColor: getBgColor() }]}>
            <Text style={[styles.text, { fontSize: font14 }]}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    chip: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
        alignSelf: "flex-start",
    },
    text: {
        fontWeight: "600",
        color: "#fff",
    },
});