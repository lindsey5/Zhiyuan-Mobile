import COLOR from "@/lib/contants/color";
import { StyleSheet, TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
    label: string;
}

export default function Button({ label, style, ...props }: ButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.btn, style]} 
            {...props}
        >
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: COLOR.highlight,
        padding: 15,
        borderRadius: 8,
    },
    text: {
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 16,
    },
});