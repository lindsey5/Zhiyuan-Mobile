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

    return (
        <View style={[styles.chip, { backgroundColor: getBgColor() }]}>
            <Text style={styles.text}>{label}</Text>
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
        fontSize: 12,
        fontWeight: "600",
        color: "#fff",
    },
});