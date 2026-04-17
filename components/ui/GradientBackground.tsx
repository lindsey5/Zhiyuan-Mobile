import React, { ReactNode } from "react";
import { StyleSheet, ViewStyle, StyleProp } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLOR from "@/lib/contants/color";

type GradientBackgroundProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  colors?: [string, string, ...string[]]; 
};

export default function GradientBackground({
    children,
    style,
    colors = [COLOR.secondary, "#fff"]
}: GradientBackgroundProps) {
    return (
        <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.container, style]}
        >
        {children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});