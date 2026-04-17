import useResponsiveFontSize from "@/hooks/useResponsiveFont";
import COLOR from "@/lib/contants/color";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

interface InputFieldProps extends TextInputProps {
    label: string;
}

export default function InputField({ label, style, ...props }: InputFieldProps) {
    const [isFocused, setIsFocused] = useState(false);
    const font16 = useResponsiveFontSize(16);

    return (
        <View style={styles.field}>
            <Text style={styles.label}>{label}</Text>

            <TextInput
                style={[
                styles.input,
                { fontSize: font16 },
                isFocused ? styles.inputFocused : styles.inputBlurred,
                style,
                ]}
                placeholderTextColor="#999"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    field: {
        marginBottom: 18,
    },

    label: {
        fontSize: 13,
        fontWeight: "900",
        color: "#555",
        marginBottom: 6,
    },

    input: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        color: "#111",
    },

    inputBlurred: {
        borderBottomColor: "#a7a6a6",
    },

    inputFocused: {
        borderBottomColor: COLOR.accent,
    },
});